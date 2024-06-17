import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loadSeller } from "../../redux/actions/user";
import { toast } from "react-toastify";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState(seller?.avatar || '');

  const [name, setName] = useState(seller?.name || '');
  const [description, setDescription] = useState(seller?.description || '');
  const [address, setAddress] = useState(seller?.address || '');
  const [phone, setPhone] = useState(seller?.phone || '');
  const [zipCode, setZipcode] = useState(seller?.zipCode || '');
  const [email, setEmail] = useState(seller?.email || '');
  const dispatch = useDispatch();
  const localhost = 'https://huycodelo.id.vn/api';
  console.log('avatar',avatar)
  const handleImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('files', file);

    try {
      const res = await axios.post(`${localhost}/upload/file`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAvatar(`https://drive.google.com/thumbnail?id=${res.data.files[0].id}`);
      // dispatch(loadSeller(seller.id));
      toast.success("Avatar updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      address,
      email,
      phone: `${phone}`,
      description,
      avatar,
    };
    try {
      await axios.patch(`${localhost}/vendor/${seller.id}`, payload, {
        withCredentials: false,
      });
      toast.success("Shop info updated successfully!");
      dispatch(loadSeller());
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
      <div className="w-full min-h-screen flex flex-col items-center">
        <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
          <div className="w-full flex items-center justify-center">
            <div className="relative">
              <img
                  src={avatar}
                  alt=""
                  className="w-[200px] h-[200px] rounded-full cursor-pointer"
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
                <input
                    type="file"
                    id="image"
                    className="hidden"
                    onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>

          <form
              aria-required={true}
              className="flex flex-col items-center"
              onSubmit={updateHandler}
          >
            <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
              <div className="w-full pl-[3%]">
                <label className="block pb-2">Shop Name</label>
              </div>
              <input
                  type="name"
                  placeholder="Shop Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                  required
              />
            </div>
            <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
              <div className="w-full pl-[3%]">
                <label className="block pb-2">Email</label>
              </div>
              <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                  required
                  readOnly={true}
              />
            </div>
            <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
              <div className="w-full pl-[3%]">
                <label className="block pb-2">Shop description</label>
              </div>
              <input
                  type="text"
                  placeholder="Enter your shop description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              />
            </div>
            <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
              <div className="w-full pl-[3%]">
                <label className="block pb-2">Shop Address</label>
              </div>
              <input
                  type="text"
                  placeholder="Shop Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                  required
              />
            </div>
            <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
              <div className="w-full pl-[3%]">
                <label className="block pb-2">Shop Phone Number</label>
              </div>
              <input
                  type="number"
                  placeholder="Shop Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                  required
              />
            </div>
            <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
              <input
                  type="submit"
                  value="Update Shop"
                  className={`${styles.input} bg-lime-300 !w-[95%] mb-4 800px:mb-0`}
                  required
                  readOnly
              />
            </div>
          </form>
        </div>
      </div>
  );
};

export default ShopSettings;
