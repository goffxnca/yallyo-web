import PageContainer from "@/components/Layouts/PageContainer";
import ProfileContainer from "@/components/Profile/ProfileContainer";
import AuthGuardRedirectHome from "@/components/Auths/AuthGuardRedirectHome";

const ProfilePage = () => {
  return (
    <AuthGuardRedirectHome>
      <PageContainer>
        <ProfileContainer />
      </PageContainer>
    </AuthGuardRedirectHome>
  );
};

export default ProfilePage;
