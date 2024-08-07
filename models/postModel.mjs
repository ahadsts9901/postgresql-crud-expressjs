import { DataTypes } from 'sequelize';

const postModel = (sequelize) => {

    const Post = sequelize.define("posts", {

        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }

    }, { timestamps: false });

    return Post;
};

export default postModel;