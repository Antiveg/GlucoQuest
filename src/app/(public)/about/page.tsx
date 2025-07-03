"use client";

import React from "react";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Heart,
  Users,
  Sparkles,
  Map,
  Target,
  Linkedin,
  Twitter,
} from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Stanic Dylan",
      role: "Web Developer",
      avatar: "🧙‍♂️",
      bio: "Dylan belives that the power of technology is here to help everyone.",
    },
    {
      name: "Nathaniel Alexander",
      role: "Web Developer",
      avatar: "🎨",
      bio: "Nathan wishes that diabetes care is less intimidating and instead be something empowering.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-white font-sans text-black">
      <main>
        <section className="bg-[#D9EFF7] py-20 px-4 border-b-2 border-black">
          <div className="container mx-auto text-center">
            <Map className="mx-auto h-20 w-20 text-[#4741A6] mb-4" />
            <h1 className="text-5xl md:text-6xl font-black leading-tight">
              Our Epic Quest
            </h1>
            <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-800">
              We&apos;re a small band of developers, designers, and diabetes
              advocates on a mission to change the way the world sees health
              management.
            </p>
          </div>
        </section>

        <section id="mission" className="py-24 px-4">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            <div className="text-center md:text-left">
              <Target className="h-16 w-16 text-red-500 mb-4 inline-block" />
              <h2 className="text-4xl font-bold">
                Our Mission: Fun First, Health Always
              </h2>
              <p className="mt-4 text-lg text-gray-700">
                Living with diabetes is a journey that requires daily courage
                and consistency. We believe the tools for this journey
                shouldn&apos;t be cold, clinical, or complicated. Our mission is
                to build an app that’s not just useful, but genuinely fun to
                use. By blending proven health strategies with engaging game
                design, we empower our users to take control of their health
                with a smile.
              </p>
            </div>
            <div className="w-full h-80 bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#000] flex items-center justify-center p-8">
              {/* <img
                src="https://images.unsplash.com/vector-1739811941027-c735b9459deb?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="fun cartoon"
                className="w-full h-full object-contain"
              /> */}
              <svg
                width="144"
                height="144"
                viewBox="0 0 144 144"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M137.925 120.897C130.498 127.728 127.403 121.468 79.629 126.943C79.2481 126.991 78.8435 127.038 78.4388 127.086C76.9868 127.252 75.5585 127.419 74.1065 127.562C61.7523 128.8 49.279 129.228 37.02 131.132C22.571 133.394 16.62 135.227 11.2403 131.609C4.62286 127.157 4.69427 118.278 4.00395 97.0928C2.4567 48.5328 0.433366 41.2012 7.38411 35.2026C7.97921 34.7027 8.5505 34.2743 9.33603 33.8934C3.14701 39.8206 5.09893 48.1996 6.59858 95.2123C7.26509 116.398 7.21748 125.277 13.835 129.728C19.1909 133.346 25.1656 131.513 39.6146 129.252C51.8736 127.348 64.3469 126.895 76.7011 125.681V110.685C76.7011 100.449 74.773 80.93 73.0829 56.4119C72.2022 43.5102 71.7023 34.2505 71.4405 28.3471C71.7261 28.3233 72.0118 28.3233 72.2736 28.2995C81.8428 27.7758 86.8654 27.5854 86.8654 27.5854C98.6721 26.6332 133.354 24.2528 134.783 27.5854C136.211 30.9179 141.543 117.564 137.925 120.897Z"
                  fill="#02B795"
                />
                <path
                  d="M73.0837 56.4119C72.203 43.5102 71.7031 34.2504 71.4412 28.3471C71.4174 27.7282 71.3936 27.1569 71.3698 26.6094C63.6574 27.0616 53.5883 27.6806 41.2817 28.5613C14.9069 30.418 12.6693 31.0131 9.9795 33.3221C9.76527 33.5125 9.55103 33.7029 9.3368 33.8934C3.14778 39.8205 5.0997 48.1995 6.59935 95.2123C7.26586 116.398 7.21825 125.277 13.8357 129.728C19.1916 133.346 25.1664 131.513 39.6154 129.252C51.8744 127.348 64.3477 126.895 76.7019 125.681V110.685C76.7019 100.449 74.7738 80.9299 73.0837 56.4119Z"
                  fill="#2E1544"
                />
                <path
                  d="M140.519 119.016C133.093 125.848 129.998 119.587 82.2236 125.062C81.4619 112.137 79.9622 88.2136 79.1053 80.6916C78.1293 72.2888 75.7727 39.1299 74.8682 26.4186C84.4373 25.8949 89.46 25.7045 89.46 25.7045C101.267 24.7524 135.949 22.372 137.377 25.7045C138.806 29.0371 144.138 115.683 140.519 119.016Z"
                  fill="#2E1544"
                />
                <path
                  d="M82.2237 125.061C81.8429 125.109 81.4382 125.157 81.0335 125.204C79.5815 125.371 78.1533 125.538 76.7012 125.68V110.684C76.7012 100.448 74.7731 80.929 73.083 56.4109C72.1071 42.1762 71.6072 32.3451 71.3691 26.6084C72.6069 26.537 73.7733 26.4656 74.8683 26.418C75.7729 39.1293 78.1295 72.2643 79.1054 80.6909C79.9862 88.213 81.462 112.136 82.2237 125.061Z"
                  fill="#FFD110"
                />
                <path
                  d="M136.354 75.0016C135.687 66.2179 135.092 65.361 134.593 64.7897C131.784 61.6476 124.333 62.2903 109.456 63.5519C105.742 63.8613 102.695 64.2184 96.7205 64.9087C91.8407 65.48 89.3889 65.7656 88.9842 65.9799C82.5333 69.4315 86.6514 81.024 86.6752 105.851C86.6752 107.875 86.6514 112.326 89.6031 114.707C92.2215 116.801 95.8873 116.254 97.4108 116.063C118.906 113.112 131.474 118.396 136.33 110.66C136.759 109.97 136.83 105.447 136.925 96.4489C136.973 90.4027 137.021 83.69 136.354 75.0016ZM133.807 95.6396C133.712 103.566 133.664 107.518 133.283 108.137C129.022 114.921 117.954 110.279 99.0294 112.874C97.6964 113.064 94.4591 113.54 92.1739 111.683C89.5793 109.589 89.6031 105.685 89.6031 103.9C89.5793 82.0713 85.9611 71.8833 91.6264 68.8364C91.9835 68.6459 94.1496 68.3841 98.4343 67.8842C103.695 67.2653 106.385 66.9558 109.646 66.694C122.738 65.5752 129.284 65.0277 131.76 67.7652C132.188 68.2413 132.736 69.003 133.307 76.7393C133.902 84.3803 133.878 90.2837 133.807 95.6396Z"
                  fill="#FFD110"
                />
                <path
                  d="M49.7318 95.0934C49.0177 95.0458 49.0891 92.7845 47.2324 89.4281C46.8515 88.7378 45.3995 86.1432 44.4235 86.3098C44.2093 86.3574 44.0188 86.5478 43.8522 87.0001C43.1381 88.833 37.3537 102.02 43.2571 108.614C44.5187 110.042 45.9232 110.59 47.8275 111.471C49.6366 112.304 54.8496 114.684 60.515 112.851C61.1577 112.637 62.9668 112.018 64.7045 110.637C72.2265 104.567 70.0603 89.8566 67.7514 89.4043C66.0375 89.0949 63.7285 96.4741 61.8242 95.9742C60.991 95.76 61.1339 94.2365 59.6818 90.904C58.5868 88.4283 57.7061 86.3812 56.3731 86.286C54.9448 86.167 53.6118 88.3093 52.4692 90.1422C50.6839 93.0701 50.4221 95.1411 49.7318 95.0934Z"
                  fill="#DCB8FD"
                />
                <path
                  d="M107.86 37.9874C107.86 37.9874 109.455 32.2745 104.79 32.0364C100.124 31.7984 99.0054 36.2973 100.005 38.7253C100.981 41.1533 103.076 42.1293 103.076 42.1293C103.076 42.1293 100.743 40.0583 96.9345 44.0812C93.1258 48.0803 94.1018 50.7701 96.9345 51.6032C99.7671 52.4602 102.719 50.3892 104.671 47.4852C104.671 47.4852 102.576 50.8891 105.909 54.0312C109.241 57.1734 115.502 55.3643 114.502 47.7232C114.502 47.7232 118.191 50.5083 122.476 47.4852C126.785 44.4383 121.738 39.2252 113.764 41.1771C116.787 40.463 118.691 38.154 118.525 35.9879C118.429 34.6072 117.477 33.2266 116.239 32.7267C113.954 31.7984 110.288 33.7027 107.86 37.9874Z"
                  fill="#DCB8FD"
                />
                <path
                  d="M59.6332 59.7202C59.419 61.0294 58.9905 63.6954 57.2529 66.6471C56.634 67.7183 54.7534 70.6462 51.0876 72.9789C46.3507 76.002 41.6613 76.0496 39.9712 76.0258C37.9955 76.0258 33.7584 75.9544 29.5213 73.2646C26.3554 71.2413 24.6891 68.6942 23.7845 67.2898C22.761 65.6711 21.1185 63.0289 20.7614 59.2679C20.3806 55.126 21.7612 51.9839 22.5229 50.2938C23.2847 48.6037 25.2604 44.4142 29.8545 41.6292C34.5201 38.7965 39.1619 39.0584 43.0895 39.2726C46.9458 39.4868 50.3259 39.6773 53.5632 42.0577C57.1814 44.7475 58.4192 48.5561 59.0143 50.4604C59.2524 51.1984 60.395 54.9118 59.6332 59.7202Z"
                  fill="#FFD110"
                />
                <path
                  d="M34.3066 96.8543C34.1875 99.4966 32.307 101.234 31.8786 101.615C31.4739 101.972 29.6172 103.615 26.9512 103.424C23.8566 103.21 22.119 100.711 21.6905 100.139C21.3334 99.6156 20.6669 98.5206 20.4051 96.9734C20.2861 96.2354 19.8576 93.617 21.5477 91.5461C23.7138 88.88 27.5224 89.4037 27.7843 89.4513C31.3311 89.975 34.4732 93.3076 34.3066 96.8543Z"
                  fill="#02B795"
                />
                <path
                  d="M25.094 110.995C24.4513 113.232 20.6188 114.041 18.0004 113.375C17.3339 113.208 16.0247 112.875 15.3106 111.685C14.287 109.971 15.382 107.924 15.5248 107.662C15.6438 107.448 16.7864 105.401 19.143 105.115C21.7376 104.806 23.4515 106.9 23.8086 107.353C24.2608 107.924 25.5463 109.471 25.094 110.995Z"
                  fill="#02B795"
                />
                <path
                  d="M96.0059 73.6704C96.0059 73.6704 104.028 71.5995 106.789 75.3605C109.55 79.1215 107.86 80.8592 108.455 85.8104C109.05 90.7616 111.812 86.8102 117.596 85.8104C123.38 84.8106 128.903 87.6433 126.142 91.0711C123.38 94.4988 116.858 99.7119 120.881 100.712C124.904 101.711 127.903 99.6881 127.903 99.6881V103.425C127.903 103.425 116.096 109.376 114.859 103.425C113.621 97.4743 122.381 91.8566 121.143 89.5714C119.881 87.2862 110.098 95.332 105.575 91.0473C101.052 86.7626 107.836 78.4788 105.837 77.0506C103.837 75.6223 96.0535 77.0506 96.0535 77.0506V73.6704H96.0059Z"
                  fill="#02B795"
                />
                <path
                  d="M27.3076 59.7202C27.3076 59.7202 28.0455 64.9809 35.8294 66.552C43.6133 68.123 50.9449 66.1235 53.6824 61.1485L49.6595 60.2915C49.6595 60.2915 50.9449 61.9578 47.4933 63.386C44.0418 64.8381 38.1384 65.5522 35.8294 64.2668C33.5204 62.9814 30.0689 58.8633 30.0689 58.8633L27.3076 59.7202Z"
                  fill="#2E1544"
                />
                <path
                  d="M34.2345 50.0331C34.4011 50.533 34.5677 50.9615 34.4487 51.4375C34.2107 52.3421 33.1157 53.08 32.0207 53.0086C30.7829 52.9372 29.7593 51.866 29.7117 50.7234C29.6403 49.0333 31.7589 47.7955 32.9252 48.2002C33.687 48.5097 34.044 49.5332 34.2345 50.0331Z"
                  fill="#2E1544"
                />
                <path
                  d="M51.2311 50.5085C51.3025 51.5321 50.5884 52.4843 49.6363 52.7699C48.8983 53.008 48.0414 52.8175 47.4701 52.3177C46.8274 51.7464 46.756 50.9846 46.7322 50.7466C46.7084 50.5085 46.6132 49.4136 47.3987 48.7947C48.0176 48.2948 48.8031 48.4138 49.0412 48.4614C49.8743 48.5804 51.1359 49.2469 51.2311 50.5085Z"
                  fill="#2E1544"
                />
              </svg>
            </div>
          </div>
        </section>

        <section
          id="team"
          className="bg-[#F0F8FF] py-24 px-4 border-y-2 border-black"
        >
          <div className="container mx-auto">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold">Meet the Adventuring Party</h2>
              <p className="mt-4 text-lg text-gray-600">
                We&apos;re a passionate crew dedicated to forging the best
                health tools.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              {teamMembers.map((member) => (
                <Card
                  key={member.name}
                  className="bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_#9BBBFC] text-center p-6"
                >
                  <div className="w-24 h-24 rounded-full bg-[#D9EFF7] border-2 border-black flex items-center justify-center text-5xl mx-auto mb-4">
                    {member.avatar}
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <p className="font-semibold text-[#4741A6]">{member.role}</p>
                  <p className="text-sm text-gray-600 mt-2">{member.bio}</p>
                  <div className="flex justify-center gap-3 mt-4">
                    <a href="#" className="text-gray-500 hover:text-black">
                      <Twitter />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-black">
                      <Linkedin />
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="values" className="py-24 px-4">
          <div className="container mx-auto">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold">Our Guiding Stars</h2>
              <p className="mt-4 text-lg text-gray-600">
                These are the principles that light our path.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <ValueCard
                icon={Sparkles}
                title="Joyful by Design"
                description="We believe in the power of fun. Every feature is designed to be engaging and motivating."
              />
              <ValueCard
                icon={Users}
                title="Community Powered"
                description="Our strength comes from our users. We build with you, for you."
              />
              <ValueCard
                icon={Heart}
                title="Empathy First"
                description="We understand the journey because we're on it too. We lead with compassion in everything we do."
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

interface ValueCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const ValueCard = ({ icon: Icon, title, description }: ValueCardProps) => (
  <div className="bg-white p-6 rounded-2xl border-2 border-black text-center">
    <div className="inline-block p-4 bg-[#F9CE69] rounded-full border-2 border-black mb-4">
      <Icon className="h-8 w-8 text-black" />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
  </div>
);
