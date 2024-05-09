import { Body, Container, Text, Head, Heading, Html, Preview } from "@react-email/components";
import * as React from "react";

interface VerifyEmailProps {
  email: string
}

export const VerifyEmail = ({email}: VerifyEmailProps) => {
  return (
    <Html>
      <Head/>
      <Preview>Verify your email</Preview>
      <Body style={{}}>
        <Container>
          <Heading>
            Verify your email
          </Heading>
          <Text>
            Hello {email}
          </Text>
        </Container>
      </Body>

    </Html>
  );
}

export default VerifyEmail;
