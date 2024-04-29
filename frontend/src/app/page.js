"use client";

import { LogInButton } from "@/components/Button/ButtonStyled"
import {Container} from "@/components/Containers/ContainerStyled";

export default function Home() {
  return (
      <Container>
          <LogInButton onClick={() => console.log("Button") }>log in</LogInButton>
      </Container>
  );
}
