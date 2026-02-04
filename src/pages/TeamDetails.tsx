import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const TeamDetails = () => {
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
    <section className="py-24">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            Our People
          </p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Meet the Team
          </h2>
          <p className="mt-4 text-muted-foreground">
            A diverse group of professionals passionate about building secure,
            reliable, and user-friendly financial solutions.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <Card className="group relative h-full overflow-hidden transition-all hover:shadow-xl">
                {/* Accent bar */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-primary/40" />

                <CardContent className="flex flex-col items-center pt-10 pb-8 text-center">
                  <Avatar className="mb-4 size-24 border-2 border-primary/20 transition-all group-hover:border-primary">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <h3 className="text-lg font-semibold">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {member.role}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamDetails;
