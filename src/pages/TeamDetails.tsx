import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TeamDetails = () => {
  const heading = "Our Teams";
  const description =
    "Our diverse team of experts brings together decades of experience in design, engineering, and product development.";
  const members = [
    {
      id: "member-1",
      name: "Sarah Chen",
      role: "CEO & Founder",
      avatar: "https://i.ibb.co.com/5WvF6F5/service-4.jpg",
    },
    {
      id: "member-2",
      name: "Marcus Rodriguez",
      role: "CTO",
      avatar: "https://i.ibb.co.com/BZLhwD1/guide-2.jpg",
    },
    {
      id: "member-3",
      name: "Emily Watson",
      role: "Head of Design",
      avatar: "https://i.ibb.co.com/XXVXHSQ/guide-4.jpg",
    },
    {
      id: "member-4",
      name: "David Kim",
      role: "Lead Engineer",
      avatar: "https://i.ibb.co.com/Kx6RtvM/guide-3.jpg",
    },
    {
      id: "member-5",
      name: "Lisa Thompson",
      role: "Product Manager",
      avatar: "https://i.ibb.co.com/9HRyhQwg/team-5.jpg",
    },
    {
      id: "member-6",
      name: "Alex Johnson",
      role: "UX Designer",
      avatar: "https://i.ibb.co.com/Ld3HCkBP/team-6.jpg",
    },
  ];

  return (
    <section className="py-16 mb-20">
      <div className="container mx-auto flex flex-col items-center text-center">
        <h2 className="my-6 text-pretty text-2xl font-bold lg:text-4xl">
          {heading}
        </h2>
        <p className="text-muted-foreground mb-8 max-w-3xl lg:text-lg">
          {description}
        </p>
      </div>
      <div className="container mx-auto mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <div key={member.id} className="flex flex-col items-center">
            <Avatar className="mb-4 size-20 border md:mb-5 lg:size-24">
              <AvatarImage src={member.avatar} />
              <AvatarFallback>{member.name}</AvatarFallback>
            </Avatar>
            <p className="text-center font-medium">{member.name}</p>
            <p className="text-muted-foreground text-center">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamDetails;
