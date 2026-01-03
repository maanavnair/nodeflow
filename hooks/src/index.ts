import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const app = express();
app.use(express.json());
const client = new PrismaClient();


app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;

    await client.$transaction(async (tx: Prisma.TransactionClient) => {
        const run = await tx.zapRun.create({
            data: {
                zapId: zapId,
                metadata: body,
            }
        });

        await tx.zapRunOutbox.create({
            data: {
                zapRunId: run.id
            }
        })
    })
    res.json({
        message: "Webhook received"
    })
})

app.listen(3000);