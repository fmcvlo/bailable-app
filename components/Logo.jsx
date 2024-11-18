import Svg, { Path, Text } from 'react-native-svg';

export const Logo = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={176} height={40} {...props}>
    <Path d="M36.978 19.49a17.49 17.49 0 1 1 0-.021" />
    <Text
      x="29" // Centra el texto horizontalmente
      y="16" // Centra el texto verticalmente (ajustar según la fuente)
      fontSize="28" // Tamaño de la fuente
      fontWeight="bold" // Negrita
      fill="white" // Color blanco
      textAnchor="middle" // Centra el texto horizontalmente
      alignmentBaseline="middle" // Centra el texto verticalmente
      transform="rotate(-15 50 50)"
    >
      B
    </Text>
    <Path
      fill="#FFBD3F"
      d="M19.982 0A20 20 0 1 0 40 20v-.024A20 20 0 0 0 19.982 0Zm-.091 4.274A15.665 15.665 0 0 1 35.57 19.921v.018A15.665 15.665 0 1 1 19.89 4.274Z"
    />
    <Text
      x="60%"
      y="50%"
      fontSize="24"
      fill="white"
      fontWeight="bold"
      textAnchor="middle"
      alignmentBaseline="middle"
      marginLeft="20"
    >
      BAILABLE
    </Text>
  </Svg>
);
