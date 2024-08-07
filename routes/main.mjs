import { Router } from "express";
import { Post } from "../models/main.mjs";

const router = Router()

router.get("/posts", async (req, res, next) => {

    try {

        const posts = await Post.findAll({
            order: [['created_at', 'DESC']]
        });

        res.send({
            message: "posts fetched",
            data: posts
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        });
    }

})

router.post("/posts", async (req, res, next) => {

    const { title, description } = req?.body

    if (!title || title?.trim() === "") {
        return res.status(400).send({
            message: "title is required"
        })
    }

    if (!description || description?.trim() === "") {
        return res.status(400).send({
            message: "description is required"
        })
    }

    try {

        const postResp = await Post.create({
            title: title,
            description: description,
        })

        res.send({
            message: "post created successfully",
            data: postResp?.dataValues
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

})

router.get("/posts/:postId", async (req, res, next) => {

    const { postId } = req?.params

    if (!postId || postId?.trim() === "") {
        return res.status(400).send({
            message: "post id is required",
        });
    }

    try {

        const post = await Post.findOne({
            where: { id: postId }
        });

        if (!post) {
            return res.status(404).send({
                message: "post not found",
            });
        }

        res.send({
            message: "post fetched",
            data: post
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        });
    }


})

router.delete("/posts/:postId", async (req, res, next) => {

    const { postId } = req?.params

    if (!postId || postId?.trim() === "") {
        return res.status(400).send({
            message: "post id is required",
        });
    }

    try {

        const deleteResponse = await Post.destroy({
            where: { id: postId }
        });

        if (!deleteResponse) {
            return res.status(404).send({
                message: "post not found",
            });
        }

        res.send({
            message: "post deleted",
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        });
    }


})

router.put("/posts/:postId", async (req, res, next) => {

    const { postId } = req?.params
    const { title, description } = req?.body

    if (!postId || postId?.trim() === "") {
        return res.status(400).send({
            message: "post id is required",
        });
    }

    if (!title || title?.trim() === "") {
        return res.status(400).send({
            message: "title is required"
        })
    }

    if (!description || description?.trim() === "") {
        return res.status(400).send({
            message: "description is required"
        })
    }

    try {

        const updateResponse = await Post.update(
            {
                title: title,
                description: description,
            },
            {
                where: { id: postId }
            }
        );

        if (!updateResponse) {
            return res.status(400).send({
                message: "post not found"
            })
        }

        res.send({
            message: "post updated",
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        });
    }


})

export default router