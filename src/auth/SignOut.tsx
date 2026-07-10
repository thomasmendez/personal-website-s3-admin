import { Authenticator, View, Heading, Button, Text, useTheme, Image } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';

const SignOutPage = () => {
  const { tokens } = useTheme();
  const navigate = useNavigate();

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <View
          backgroundColor="bg-neutral-900"
          minHeight="100vh"
          padding={tokens.space.medium}
        >
          <View
            backgroundColor={tokens.colors.background.primary}
            borderRadius={tokens.radii.medium}
            boxShadow={String(tokens.shadows.medium)}
            maxWidth="28rem"
            margin="0 auto"
            marginTop={tokens.space.xxxl}
            padding={tokens.space.xl}
          >
            {/* Header */}
            <View textAlign="center" marginBottom={tokens.space.large}>
              <Image
                alt="Amplify logo"
                src="https://docs.amplify.aws/assets/logo-dark.svg"
                marginBottom={tokens.space.medium}
              />
            </View>

            {/* Sign Out Content */}
            <View textAlign="center" marginBottom={tokens.space.xl}>
              <Heading level={3} marginBottom={tokens.space.medium}>
                Sign Out
              </Heading>
              <Text color={tokens.colors.neutral[80]}>
                Signed in as: <strong>{user?.username || user?.signInDetails?.loginId || 'User'}</strong>
              </Text>
            </View>

            {/* Logout Button */}
            <Button
              onClick={() => {
                signOut?.();
                navigate('/login');
              }}
              variation="primary"
              size="large"
              width="100%"
            >
              Logout
            </Button>

            {/* Footer */}
            <View textAlign="center" marginTop={tokens.space.large}>
              <Text color={tokens.colors.neutral[80]}>
                &copy; All Rights Reserved
              </Text>
            </View>
          </View>
        </View>
      )}
    </Authenticator>
  );
};

export default SignOutPage;
