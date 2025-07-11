"use client";

import { useCreateAOrderMutation, useGetGeneralQuery } from "@/redux/api";
import {
  Search,
  ShoppingBag,
  X,
  Minus,
  Plus,
  User,
  Phone,
  MapPin,
  StickyNote,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SecondaryNav from "../ui/SecondaryNav";
import { useCallback, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/featcher/hoocks";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/redux/featcher/CartSlice";
import { taugleDrawer } from "@/redux/featcher/generalSlice";
import { Tgeneral, TOrder } from "@/types";
import { resetFilters, setSearchTerm } from "@/redux/featcher/searchSlice";
import { useRouter } from "next/navigation";

const Nav = () => {
  const { data, isLoading } = useGetGeneralQuery<{
    isLoading: boolean;
    data: { data: { name: string; logoUrl: string } };
  }>(null);
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();
  const { drawerOpen } = useAppSelector((p) => p.general);
  const { items } = useAppSelector((state) => state.cartProduct);

  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const toggleDrawer = () => dispatch(taugleDrawer());
  const toggleMobileSearch = () => {
    setQuery("")
    dispatch(setSearchTerm(""))
    setMobileSearchOpen((open) => !open)
  };

  const cartTotalProductCount = items.reduce((t, n) => t + n.quantity, 0);

  // Order form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [deliveryChargeType, setDeliveryChargeType] = useState<"inside" | "outside">("inside");
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const deliveryCharge = deliveryChargeType === "inside" ? 80 : 150;
  const subtotal = items.reduce((t, i) => t + i.price * i.quantity, 0);
  const total = subtotal + deliveryCharge;

  // 🎁 Free Gift Logic

  const { data: generalData } = useGetGeneralQuery(null)
  const general: Tgeneral = generalData?.data

  const offerAvailable = general?.freeGift?.applicable || false; // toggle this as needed

  // const freeGift = {
  //   id: "gift001",
  //   name: "ফ্রি চমকপ্রদ উপহার",
  //   imageUrl: "/gift.jpg",
  //   description: "আপনার অর্ডারের সাথে ফ্রি!",
  // };
  const qualifiesForGift = offerAvailable && subtotal >= general?.freeGift?.buyAbove;

  const [createOrder, { isLoading: orderLoading }] = useCreateAOrderMutation()
  const handleSubmit = async () => {
    const newErrors = { name: "", phone: "", address: "" };
    let hasError = false;

    if (!name.trim()) {
      newErrors.name = "নাম লিখুন";
      hasError = true;
    }
    if (!phone.trim()) {
      newErrors.phone = "ফোন নম্বর লিখুন";
      hasError = true;
    }
    if (!address.trim()) {
      newErrors.address = "ঠিকানা লিখুন";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;



    const payload: TOrder = {
      customerName: name,
      customerAddress: address,
      customerPhone: phone,
      deliveryCharge,
      paymentMethod: "COD",
      products: items,
      totalAmount: subtotal,
      freeGiftEligible: offerAvailable && subtotal >= general?.freeGift?.buyAbove,
      giftProduct: offerAvailable && subtotal >= general?.freeGift?.buyAbove ? { imageUrl: general?.freeGift?.product?.images[0], name: general?.freeGift?.product?.name } : { imageUrl: "", name: "" }
    }

    const response = await createOrder(payload)

    if (response?.data?.statusCode === 200) {

      alert(`✅ অর্ডার সফলভাবে জমা হয়েছে! অর্ডার কনফার্ম এর জন্য আপনার সাথে যোগাযোগ করা হবে,${payload.customerPhone} - এই নাম্বারে।`);
      dispatch(clearCart())
    }

  };


  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const move = useRouter()

  const handleSearch = useCallback(async (searchText: string) => {

    dispatch(resetFilters())
    if (searchText.length !== 0) {
      dispatch(setSearchTerm(searchText))
    }
    move.push("/all-product")
  }, [dispatch, move])


  const searchHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Clear previous debounce
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set new debounce
    debounceTimeout.current = setTimeout(() => {
      handleSearch(value);
    }, 500); // adjust debounce time (ms)
  };

  return (
    <>
      {/* HEADER */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-30">
        <div className="mx-auto max-w-[1400px] px-4">
          <div className="relative flex items-center justify-between py-2 sm:py-0 gap-2 sm:gap-6">
            {/* Mobile Search Toggle */}
            <div className="flex items-center gap-2 sm:hidden z-10">
              {!mobileSearchOpen && (
                <button
                  onClick={toggleMobileSearch}
                  aria-label="Search"
                  className="cursor-pointer p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  <Search className="h-5 w-5 text-gray-600" />
                </button>
              )}
            </div>

            {/* Search */}
            <div
              className={`flex-grow sm:max-w-md transition-all duration-500 ${mobileSearchOpen
                ? "max-w-full opacity-100"
                : "max-w-0 opacity-0 overflow-hidden sm:max-w-md sm:opacity-100"
                }`}
            >
              <div className="relative">
                <input value={query} onChange={searchHandle}
                  type="text"
                  placeholder="কি খুঁজছেন লিখুন..."
                  className="w-full border border-gray-300 rounded-full py-2.5 sm:py-3 pl-5 pr-12 text-sm shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
                <button
                  onClick={toggleMobileSearch}
                  aria-label="Close search"
                  className="cursor-pointer absolute right-3 top-2.5 sm:hidden"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
                <Search className="absolute right-4 top-3 h-5 w-5 text-gray-400 hidden sm:block" />
              </div>
            </div>

            {/* Logo */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 flex flex-col items-center text-center flex-shrink-0 mx-1 sm:static sm:translate-x-0 sm:mx-0 min-w-[70px] sm:min-w-0 transition-opacity duration-300 ${mobileSearchOpen ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
            >
              {isLoading ? (
                <div className="w-20 sm:w-36 h-8 sm:h-10 bg-gray-200 rounded animate-pulse" />
              ) : (
                <Link href="/" className="cursor-pointer">
                  <Image
                    width={400}
                    height={300}
                    src={data?.data?.logoUrl}
                    alt="Logo"
                    className="   w-auto md:w-44 lg:w-52 h-[60px] sm:h-[120px] object-contain"
                  />
                </Link>
              )}
              {!isLoading && (
                <span className="text-xs text-gray-500 mt-0.5 tracking-wide">
                  {data?.data?.name}
                </span>
              )}
            </div>

            {/* Cart */}
            <div className="flex items-center gap-3 relative flex-shrink-0 z-10">
              <button
                onClick={toggleDrawer}
                aria-label="কার্ট খুলুন"
                className="cursor-pointer relative flex items-center justify-center bg-pink-600 hover:bg-pink-700 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 shadow-lg"
              >
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-pink-900 text-xs font-bold rounded-full px-1.5 py-[2px] min-w-[18px] text-center">
                  {cartTotalProductCount}
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 bg-white shadow-sm">
          <div className="mx-auto max-w-[1400px] px-4 py-2 overflow-x-auto">
            <SecondaryNav />
          </div>
        </div>
      </header>

      {/* CART DRAWER */}
      <div
        className={`fixed top-0  z-50 right-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300  ${drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">আপনার অর্ডার</h2>
          <button
            onClick={toggleDrawer}
            aria-label="বন্ধ করুন"
            className="cursor-pointer text-gray-600 hover:text-pink-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-56px)] space-y-6">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">আপনার কার্ট খালি।</p>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 border-b pb-4 last:border-b-0"
                  >
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                        কোনো ছবি নেই
                      </div>
                    )}
                    <div className="flex flex-col flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-semibold text-gray-800">{item.name}</span>
                          <div className="text-sm text-gray-500">
                            একক দাম: ৳ {item.price.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-700 font-medium">
                            মোট: ৳ {(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                        <button
                          onClick={() => dispatch(removeFromCart(item.productId))}
                          aria-label="মুছে ফেলুন"
                          className="text-gray-400 hover:text-red-500 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => dispatch(decrementQuantity(item.productId))}
                          className="cursor-pointer p-1 border border-gray-300 rounded hover:bg-gray-100"
                          aria-label="কমান"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(incrementQuantity(item.productId))}
                          className="cursor-pointer p-1 border border-gray-300 rounded hover:bg-gray-100"
                          aria-label="বাড়ান"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Free Gift Block */}
                {qualifiesForGift && (
                  <div className="flex gap-4 border border-green-300 rounded p-3 bg-green-50">
                    <Image
                      src={general?.freeGift?.product?.images[0]}
                      alt={general?.freeGift?.product?.name}
                      width={60}
                      height={60}
                      className="rounded object-cover"
                    />
                    <div className="flex flex-col justify-center">
                      <div className="font-semibold text-green-800">{general?.freeGift?.product?.name}</div>
                      <div className="text-sm text-green-700">আপনার অর্ডারের সাথে ফ্রি!</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Free Gift Notice */}
              {qualifiesForGift && (
                <div className="mt-3 p-3 border-l-4 border-green-500 bg-green-50 text-green-800 text-sm rounded">
                  🎉 অভিনন্দন! আপনার অর্ডারে একটি <strong>{general?.freeGift?.product?.name}</strong> ফ্রি উপহার যোগ হয়েছে।
                </div>
              )}

              {/* Order Form */}
              <form className="space-y-4 mt-4">
                {/* Name */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">আপনার নাম</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors({ ...errors, name: "" });
                    }}
                    placeholder="যেমন: মোঃ আলিম"
                    className="mt-1 w-full border border-gray-300 rounded pl-10 pr-3 py-2 text-sm focus:border-pink-500 focus:ring-pink-500"
                  />
                  <User className="absolute top-9 left-3 h-4 w-4 text-gray-400" />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">ফোন নম্বর</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setErrors({ ...errors, phone: "" });
                    }}
                    placeholder="যেমন: 017XXXXXXXX"
                    className="mt-1 w-full border border-gray-300 rounded pl-10 pr-3 py-2 text-sm focus:border-pink-500 focus:ring-pink-500"
                  />
                  <Phone className="absolute top-9 left-3 h-4 w-4 text-gray-400" />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Address */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">ঠিকানা</label>
                  <textarea
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setErrors({ ...errors, address: "" });
                    }}
                    rows={2}
                    placeholder="থানা এবং জেলা সহ আপনার সম্পূর্ণ ঠিকানা লিখুন"
                    className="mt-1 w-full border border-gray-300 rounded pl-10 pr-3 py-2 text-sm focus:border-pink-500 focus:ring-pink-500"
                  />
                  <MapPin className="absolute top-9 left-3 h-4 w-4 text-gray-400" />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                  )}
                </div>

                {/* Note */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">অর্ডার নোট</label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                    placeholder="যেমন: পণ্যটি দ্রুত পাঠান"
                    className="mt-1 w-full border border-gray-300 rounded pl-10 pr-3 py-2 text-sm focus:border-pink-500 focus:ring-pink-500"
                  />
                  <StickyNote className="absolute top-9 left-3 h-4 w-4 text-gray-400" />
                </div>

                {/* Delivery */}
                <div>
                  <span className="block text-sm font-medium text-gray-700 mb-1">ডেলিভারি স্থান</span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="delivery"
                        value="inside"
                        checked={deliveryChargeType === "inside"}
                        onChange={() => setDeliveryChargeType("inside")}
                        className="accent-pink-600"
                      />
                      <span className="text-sm">কুমিল্লার ভিতরে (৳80)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="delivery"
                        value="outside"
                        checked={deliveryChargeType === "outside"}
                        onChange={() => setDeliveryChargeType("outside")}
                        className="accent-pink-600"
                      />
                      <span className="text-sm">কুমিল্লার বাহিরে (৳150)</span>
                    </label>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="border-t pt-3 text-sm text-gray-700 space-y-1">
                  <div className="flex justify-between">
                    <span>মোট</span>
                    <span>৳ {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ডেলিভারি</span>
                    <span>৳ {deliveryCharge}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-gray-900">
                    <span>সর্বমোট</span>
                    <span>৳ {total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  disabled={isLoading}
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded cursor-pointer"
                >
                  {!orderLoading ? "ক্যাশ অন ডেলিভারি অর্ডার" : "....."}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {drawerOpen && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 bg-[#0000009f] bg-opacity-40 z-30 cursor-pointer"
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Nav;
