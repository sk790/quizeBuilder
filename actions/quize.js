"use server";

import prisma from "@/lib/prisma";

export async function GetQuizStatus() {
  const status = await prisma.quiz.aggregate({
    where: {
      userId: "sample-user-id",
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = status._sum.visits || 0;
  const submissions = status._sum.submissions || 0;

  let submissionRate = 0;
  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  };
}
