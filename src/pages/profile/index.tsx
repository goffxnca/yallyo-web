import PageContainer from "@/components/Layouts/PageContainer";
import ProfileContainer from "@/components/Profile/ProfileContainer";
import AuthGuard from "@/components/UIs/AuthGuard";

const ProfilePage = () => {
  return (
    <AuthGuard redirectToHome={false}>
      <PageContainer>
        <ProfileContainer />
      </PageContainer>
    </AuthGuard>
  );
};

export default ProfilePage;
