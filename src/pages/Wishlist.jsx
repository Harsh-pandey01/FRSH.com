import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { removeItemFromWishlist } from "../store/WishListSlice";

function Wishlist() {
  const { wishlist } = useSelector((state) => state.wishlistdata);
  const dispatch = useDispatch();
  return (
    <div className="w-full px-5 pt-5">
      <button
        onClick={() => {
          history.back();
        }}
        className="border border-border px-5 py-1 rounded-sm cursor-pointer group"
      >
        <IoIosArrowRoundBack className="group-hover:-translate-x-2 duration-150 ease-in-out transition-all" />
      </button>

      <div className="mt-10 ">
        {wishlist.length == 0 ? (
          <p className="text-center">No Item is present in wishlist</p>
        ) : (
          <div className="flex items-center gap-10 flex-wrap justify-center">
            {wishlist.map((item) => {
              return (
                <div className="w-80 px-2.5 flex  flex-col gap-2.5 py-2 border border-border rounded-xl">
                  <Link
                    to={`/productPage/${item?.productId}`}
                    className="w-full h-70 cursor-pointer"
                  >
                    <img
                      className="h-full w-full object-top object-cover rounded-md"
                      src={item.banner}
                      alt="item-img"
                    />
                  </Link>
                  <div
                    onClick={() => {
                      dispatch(
                        removeItemFromWishlist({ productId: item.productId })
                      );
                    }}
                    className="border cursor-pointer border-border font-inter text-center px-5 py-2.5"
                  >
                    Remove from Wishlist
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
