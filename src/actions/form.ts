'use strict'

import { currentUser } from '@clerk/nextjs'

import prisma from '@/lib/prisma'

class UserNotFoundError extends Error {
  constructor() {
    super('User not found')
  }
}

export async function getFormStats() {
  const user = await currentUser()

  if (!user) {
    throw new UserNotFoundError()
  }

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  })

  const visits = stats._sum.visits || 0
  const submissions = stats._sum.submissions || 0

  const submissionRate = visits > 0 ? (submissions / visits) * 100 : 0
  const bounceRate = visits > 0 ? ((visits - submissions) / visits) * 100 : 0

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  }
}
