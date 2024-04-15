const User = require("../models/user")


exports.addToFavourites = async (req, res) => {
            const { id } = req.params;
            const favourite = req.body;

            try {
                        let user = await User.findById(id);

                        if (!user) {
                                    return res
                                                .status(404)
                                                .json({ success: false, message: "User not found" });
                        }

                        const existingFavourite = user.favourites.some(
                                    (fav) => fav.idMeal === favourite.idMeal
                        );

                        if (existingFavourite) {
                                    return res
                                                .status(400)
                                                .json({ success: false, message: "Recipe already in favourites" });
                        } else {
                                    user.favourites = [...user.favourites, favourite];
                                    await user.save();
                                    return res
                                                .status(200)
                                                .json({ success: true, message: "Added to favourites" });
                        }
            } catch (error) {
                        return res.status(500).json({ success: false, message: error.message });
            }
};


exports.removeFromFavourites = async (req, res) => {
            const { id } = req.params;
            const favourite = req.body

            try {
                        let user = await User.findById(id);
                        if (!user) {
                                    res.status(404).json({ success: false, message: "User not found" })
                        }
                        user.favourites = user.favourites.filter((fav) => fav.idMeal !== favourite.idMeal)
                        await user.save()
                        return res.status(200).json({ success: false, message: "Removed from favourites" })
            }
            catch (err) {
                        res.status(500).json({ success: false, message: err.message });
            }

}


exports.getFavourites = async (req, res) => {
            const { id } = req.body;
            let user = await User.findOne(id)
            try {
                        if (!user) {
                                    return res.status(404).json({ message: "User not found" })
                        }
                        return res.status(200).json({ success: true, favourites: user.favourites })
            } catch (error) {
                        return res.status(500).json({ success: false, message: error.message })
            }
}