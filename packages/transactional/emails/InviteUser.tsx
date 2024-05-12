import {
  Body,
  Link,
  Container,
  Text,
  Head,
  Heading,
  Html,
  Button,
  Preview,
  Section,
  Img,
  Hr,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.BASE_URL
  ? `https://${process.env.BASE_URL}`
  : "http://localhost:3000";

interface InviteUserProps {
  agency: {
    name: string;
  };
  user: {
    email: string;
    name?: string;
  };
  invitedBy: {
    email: string;
    name?: string;
  };
  inviteLink: string;
}

export const InviteUser = ({
  agency,
  user,
  invitedBy,
  inviteLink,
}: InviteUserProps) => {
  return (
    <Html>
      <Head />
      <Preview>Team invitation</Preview>
      <Body style={{}}>
        <Container>
          <Section>
            {/* https://www.needpix.com/photo/download/1639487/car-car-design-car-vector-vehicle-automotive-sporty-technology-modern-transportation */}
            <Img src={`${baseUrl}/static/logo.jpg`} /> {/* TODO: add img here*/}
          </Section>
          <Heading>
            Join <strong>{agency.name}</strong> on <strong>POG cars</strong>
          </Heading>
          <Text>Hello {user.name ?? user.email},</Text>
          <Text>
            {invitedBy.name ? (
              <>
                <strong>{invitedBy.name}</strong> (
                <Link href={`mailto:${invitedBy.email}`}>
                  {invitedBy.email}
                </Link>
                )
              </>
            ) : (
              <Link href={`mailto:${invitedBy.email}`}>{invitedBy.email}</Link>
            )}{" "}
            has invited you to the <strong>{agency.name}</strong> agency on{" "}
            <strong>POG cars</strong>
          </Text>
          <Section>
            <Button href={inviteLink}>Join the team</Button>
            <Text>
              or copy and paste this URL into your browser:{" "}
              <Link href={inviteLink}>{inviteLink}</Link>
            </Text>
            <Hr />
            <Text>
              This invitation was intended for{" "}
              <span>{user.name ?? user.email}</span> If you were not expecting
              this invitation, you can ignore this email. If you are concerned
              about your account's safety, please reply to this email to get in
              touch with us.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

InviteUser.PreviewProps = {
  inviteLink:
    "http://localhost:3000/agencies/invite?u=cfd25111-9b9d-4e1c-95dd-81a0c1e502b3",
  agency: {
    name: "pOg",
  },
  user: {
    name: "John",
    email: "john.doe@mail.com",
  },
  invitedBy: {
    name: "Marta",
    email: "marta.lenore@mail.com",
  },
} satisfies InviteUserProps;

export default InviteUser;
