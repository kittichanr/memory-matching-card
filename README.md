# Memory Match Card

# Description
- Develop a web application for a memory matching game where players match
cards with identical images until all cards are matched. You may use any
technology you are comfortable with for both Frontend and Backend
development.


# Requirements
## Frontend
- Design a simple and functional (Responsive).
- Display cards in a grid format (e.g., 4x4), with each card having a hidden
image.
- When a player clicks a card, the card should flip to reveal the image.
- If two revealed cards match, they should remain flipped and marked as
matched.
- If they do not match, the cards should flip back to their hidden state after a
short delay.
- Display the number of attempts made by the player.
- When all cards are matched, display a congratulatory message.

## Backend
- Develop APIs for:
  1. Fetching card data (e.g., /api/cards ).
  2. Recording player scores (e.g., /api/score ).
  3. Retrieving high scores (e.g., /api/leaderboard ).
- Use a database to store player scores and statistics (if necessary).

## Database Schema
```
Score {
    id        String   @id @default(uuid())
    name      String
    score     Int
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt

    @@index([name])
}

```


# Stack
- Next.js
- Prisma Postgres
- tRpc

# Installation

1. run docker for instance postgres database `docker-compose -f docker-compose.yml up`
2. duplicate file `.env.example` and rename to `.env`
3. install dependencies `yarn install`
4. `yarn db:push` for initial database schema in database
5. `yarn dev` for run Next.js