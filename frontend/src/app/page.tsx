// import Navbar from "@/src/components/base/Navbar";
import HeroSection from "@/src/components/base/HeroSection";
import FeatureSection from "@/src/components/base/FeatureSection";
import UserReviews from "@/src/components/base/UserReviews";
import Footer from "@/src/components/base/Footer";
// import { authOptions, CustomSession } from "./api/auth/[...nextauth]/options";
// import { getServerSession } from "next-auth";
export default async function LandingPage() {
  // const session: CustomSession | null = await getServerSession(authOptions);
  return (
    <div className="min-h-screen flex flex-col ">
      {/* Header */}
      {/* <Navbar user={session?.user ?? null} /> */}
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeatureSection />

      {/* User Reviews Section */}
      <UserReviews />

      {/* Footer */}
      <Footer />
    </div>
  );
}
