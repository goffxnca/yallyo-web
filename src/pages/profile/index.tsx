import PageContainer from "@/components/Layouts/PageContainer";
import ProfileForm from "@/components/Profile/ProfileForm";
import AuthGuard from "@/components/UIs/AuthGuard";

const ProfilePage = () => {
  return (
    <AuthGuard redirectToHome={false}>
      <PageContainer>
        <ProfileForm onSubmit={() => {}} />
      </PageContainer>
    </AuthGuard>
  );
};

export default ProfilePage;
