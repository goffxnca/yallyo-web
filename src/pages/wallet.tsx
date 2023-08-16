import PageContainer from "@/components/Layouts/PageContainer";
import ProfileContainer from "@/components/Profile/ProfileContainer";
import AuthGuardRedirectHome from "@/components/Auths/AuthGuardRedirectHome";
import WalletContainer from "@/components/Wallets/WalletContainer";

const WalletPage = () => {
  return (
    <AuthGuardRedirectHome>
      <PageContainer>
        <WalletContainer />
      </PageContainer>
    </AuthGuardRedirectHome>
  );
};

export default WalletPage;
