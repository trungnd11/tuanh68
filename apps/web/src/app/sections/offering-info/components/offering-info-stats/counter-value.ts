export type ParsedAnimatedCounterValue = {
  value: number;
  decimals: number;
  prefix: string;
  suffix: string;
  decimalSeparator: "." | ",";
  groupSeparator: "." | ",";
};

const NUMBER_TOKEN_PATTERN = /(\d[\d.,]*)/;
type NumberSeparator = "." | ",";

function parseNumberToken(token: string): {
  value: number;
  decimals: number;
  decimalSeparator: NumberSeparator;
  groupSeparator: NumberSeparator;
} {
  const lastCommaIndex = token.lastIndexOf(",");
  const lastDotIndex = token.lastIndexOf(".");
  const decimalSeparatorIndex = Math.max(lastCommaIndex, lastDotIndex);

  const separatorCount = (token.match(/[.,]/g) ?? []).length;

  const hasDecimalSeparator =
    separatorCount === 1 && decimalSeparatorIndex > -1 && token.length - decimalSeparatorIndex - 1 !== 3;

  if (!hasDecimalSeparator) {
    const separatorMatch = token.match(/[.,]/);
    const groupSeparator: NumberSeparator = separatorMatch?.[0] === "." ? "." : ",";

    return {
      value: Number(token.replace(/[.,]/g, "")),
      decimals: 0,
      decimalSeparator: ".",
      groupSeparator,
    };
  }

  const decimals = token.length - decimalSeparatorIndex - 1;
  const integerPart = token.slice(0, decimalSeparatorIndex).replace(/[.,]/g, "");
  const decimalPart = token.slice(decimalSeparatorIndex + 1);
  const decimalSeparator: NumberSeparator = token[decimalSeparatorIndex] === "," ? "," : ".";
  const groupSeparator: NumberSeparator = decimalSeparator === "," ? "." : ",";

  return {
    value: Number(`${integerPart}.${decimalPart}`),
    decimals,
    decimalSeparator,
    groupSeparator,
  };
}

export function parseAnimatedCounterValue(input: string): ParsedAnimatedCounterValue {
  const matchedToken = input.match(NUMBER_TOKEN_PATTERN);

  if (!matchedToken || matchedToken.index === undefined) {
    return {
      value: 0,
      decimals: 0,
      prefix: input,
      suffix: "",
      decimalSeparator: ".",
      groupSeparator: ",",
    };
  }

  const token = matchedToken[0];
  const prefix = input.slice(0, matchedToken.index);
  const suffix = input.slice(matchedToken.index + token.length);
  const { value, decimals, decimalSeparator, groupSeparator } = parseNumberToken(token);

  return {
    value: Number.isFinite(value) ? value : 0,
    decimals,
    prefix,
    suffix,
    decimalSeparator,
    groupSeparator,
  };
}

export function formatAnimatedCounterValue(parsedValue: ParsedAnimatedCounterValue, animatedValue: number) {
  const formattedValue = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: parsedValue.decimals,
    maximumFractionDigits: parsedValue.decimals,
  }).format(animatedValue);

  const localizedValue =
    parsedValue.groupSeparator === "," && parsedValue.decimalSeparator === "."
      ? formattedValue
      : formattedValue
          .replace(/,/g, "__GROUP__")
          .replace(/\./g, "__DECIMAL__")
          .replace(/__GROUP__/g, parsedValue.groupSeparator)
          .replace(/__DECIMAL__/g, parsedValue.decimalSeparator);

  return `${parsedValue.prefix}${localizedValue}${parsedValue.suffix}`;
}
