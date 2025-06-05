import { Text } from "@react-email/components";
import { EmailLayout } from "./layout-email";

export const SendVerificationOTP = ({
  username,
  otp,
}: {
  username: string;
  otp: string;
}) => {
  return (
    <EmailLayout preview="Your verification code">
      <Text className="text-2xl font-bold text-gray-800">
        Verify your email
      </Text>
      <Text className="text-gray-600">Hi {username},</Text>
      <Text className="text-gray-600">
        Please enter the following code to verify your email address:
      </Text>
      <Text className="bg-gray-100 px-6 py-3 my-4 block text-center text-xl font-mono">
        {otp}
      </Text>
      <Text className="text-gray-500 text-sm mt-6">
        If you didn't request this code, you can safely ignore this email.
      </Text>
    </EmailLayout>
  );
};
