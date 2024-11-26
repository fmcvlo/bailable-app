import Svg, { Path, Text } from 'react-native-svg';
import { Platform } from 'react-native';

export const Logo = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || (Platform.OS === 'web' ? 220 : 176)} // Ajuste dinámico
    height={props.height || (Platform.OS === 'web' ? 60 : 40)}
    viewBox="0 0 220 60" // Asegura un área de vista más amplia para el texto
    {...props}
  >
    {/* Círculo amarillo con la B */}
    <Path
      fill="#FFBD3F"
      d="M19.982 0A20 20 0 1 0 40 20v-.024A20 20 0 0 0 19.982 0Zm-.091 4.274A15.665 15.665 0 0 1 35.57 19.921v.018A15.665 15.665 0 1 1 19.89 4.274Z"
    />
    <Text
      x="20.5" // Ajuste de posición horizontal
      y="29" // Ajuste de posición vertical
      fontSize={27}
      fontWeight="bold"
      fill="white"
      textAnchor="middle"
      transform="rotate(-15 19 20)"
    >
      B
    </Text>

    {/* Texto "BAILABLE" */}
    <Text
      x="60" // Ajuste para que el texto quede a la derecha del círculo
      y="30" // Centrado verticalmente respecto al círculo
      fontSize={Platform.OS === 'web' ? 26 : 24} // Ajuste dinámico para web y móvil
      fontWeight="bold"
      fill="white"
      textAnchor="start" // Alineación a la izquierda
    >
      BAILABLE
    </Text>
  </Svg>
);
