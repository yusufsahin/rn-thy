import { Text, useTheme } from "@rneui/themed";

const RNEText = ({ children, level = 3, style }) => {
  const { theme } = useTheme();

  return (
    <Text
      h1={level === 1}
      h2={level === 2}
      h3={level === 3}
      h4={level === 4}
      h5={level === 5}
      h6={level === 6}
      style={[{ color: theme.colors.text }, style]}
    >
      {children}
    </Text>
  );
};
 export default RNEText;