import { Button, useTheme } from "@rneui/themed"

const RNEButton = ({title,onPress,style}) => {

    const {theme}= useTheme();
  return (
    <Button
    title={title}
    onPress={onPress}
    buttonStyle={[
        { backgroundColor: theme.colors.buttonBackground },
        style,
      ]}
      titleStyle={{ color: theme.colors.buttonText }}
    />
    
  );
};

export default RNEButton