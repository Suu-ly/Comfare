import AwesomeButton from 'react-native-really-awesome-button';
import {Text} from 'react-native-paper';
import {VariantProp} from 'react-native-paper/lib/typescript/components/Typography/types';
import theme from './constants/theme.json';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Constants from './constants/Constants';

interface ButtonProps {
  backgroundColor: string;
  backgroundDark?: string;
  disabled?: boolean;
  inactive?: boolean;
  filled?: boolean;
  borderColor?: string;
  icon?: string;
  stretch?: boolean;
  height?: number;
  children?: React.ReactNode;
  textVariant?: VariantProp<never>;
  textColor: string;
  onPress: (callback?: () => void) => void;
}

const DuoButton = (props: ButtonProps) => {
  const {
    backgroundColor,
    backgroundDark,
    disabled = false,
    inactive = false,
    filled = true,
    borderColor,
    icon,
    stretch = false,
    height = Constants.buttonSize,
    children,
    textVariant = 'labelLarge',
    textColor,
    onPress,
  } = props;
  return (
    <AwesomeButton
      height={height}
      width={children ? null : Constants.buttonSize}
      disabled={disabled || inactive}
      borderRadius={Constants.radiusSmall}
      paddingHorizontal={Constants.mediumGap}
      stretch={stretch}
      onPressedIn={onPress}
      springRelease={false}
      backgroundShadow="transparent"
      raiseLevel={disabled ? 0 : filled ? 4 : 2}
      backgroundColor={
        disabled && filled
          ? theme.colors.surfaceDisabledInvert
          : backgroundColor
      }
      backgroundDarker={filled ? backgroundDark : borderColor}
      borderWidth={filled ? 0 : 2}
      borderColor={
        disabled ? theme.colors.onSurfaceDisabledInvert : borderColor
      } //for some reason the border draws as black with an overlay so we have to invert the colour
    >
      <>
        {icon && (
          <Icon
            name={icon}
            size={Constants.iconMedium}
            color={disabled ? theme.colors.onSurfaceDisabled : textColor}
          />
        )}
        {children && (
          <Text
            variant={textVariant}
            style={[
              disabled
                ? {color: theme.colors.onSurfaceDisabled}
                : {color: textColor},
              {marginHorizontal: Constants.mediumGap},
            ]}>
            {children}
          </Text>
        )}
      </>
    </AwesomeButton>
  );
};

export default DuoButton;