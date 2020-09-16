const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");
const product = require("./product");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    password: { type: String, required: true },

    email: { type: String, required: true },
    resetToken: String,
    resetTokenExpiration: Date,
    cart: {
        items: [
            {
                productId: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true },
            },
        ],
    },
});


UserSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            productId: product._id, quantity: newQuantity
        });

    }
    const updatedCart = { items: updatedCartItems };
    this.cart = updatedCart;
    return this.save();
}

UserSchema.methods.removeFromCart = function (productId) {
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save();
};

UserSchema.methods.clearCart = function () {
    this.cart = { items: [] };
    return this.save();

}

module.exports = mongoose.model("User", UserSchema);


