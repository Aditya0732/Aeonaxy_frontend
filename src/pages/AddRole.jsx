import React from 'react';
import { FaAngleLeft } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import CardOption from '../components/CardOption';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader, setSelectedCards } from '../redux/actions/infoSlice';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { setUser } from '../redux/actions/authSlice';

const AddRole = () => {
    const selectedCards = useSelector(state => state.info.selectedCards);
    const avatar = useSelector(state => state.info.avatar);
    const accessToken = useSelector(state => state.auth.accessToken);
    const user = useSelector(state => state.auth.user);
    const location = useSelector(state => state.info.location);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCardClick = (card) => {
        if (selectedCards.includes(card)) {
            dispatch(setSelectedCards(selectedCards.filter((selectedCard) => selectedCard !== card)));
        } else {
            dispatch(setSelectedCards([...selectedCards, card]));
        }
    };

    // const sendEmail = (e) => {
    //     e.preventDefault();


    // };

    const handleFinish = async () => {
        try {
            dispatch(setLoader(true));
            const response = await axios.post(
                'https://aeonaxy-backend-dug0.onrender.com/api/user/update',
                {
                    selectedRoles: selectedCards,
                    location: location, // You can get the location from your component state
                    avatar: avatar, // You can get the selected image from your component state
                },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                    withCredentials: true, // This will include cookies in the request
                }
            );
            console.log(response.data.user);
            const serviceId = "service_bknsntk";
            const templateId = "template_bybb4ei";
            const publickey = "-Ye-xAONr3oGPpTct";

            const templateParams = {
                to_Email: user.email,
                link: `https://aeonaxy-frontend.onrender.com/verify?emailToken=${response.data.user.emailToken}`,
            }

            emailjs.send(serviceId, templateId, templateParams, publickey)
                .then((response) => {
                    console.log("success", response);
                }).catch((error) => {
                    console.log("error", error);
                })
            dispatch(setLoader(false));
            dispatch(setUser(response.data.user));
            navigate('/verify');
        } catch (error) {
            dispatch(setLoader(false));
            console.error('Error updating user details:', error);
            // Handle error here
        }
    };

    return (
        <div className='block'>
            <div className='flex justify-start p-10 gap-6'>
                <div className='mt-1'>
                    <img src='/13825.jpg' alt='logo' className='w-20 font-bold' />
                </div>
                <Link to="/addPhoto">
                    <div className='bg-[#eeeeee] hover:bg-[#E0E0E0] py-2 px-3 flex items-center rounded cursor-pointer'>
                        <span><FaAngleLeft color='#0D0C22' size={12} /></span>
                    </div>
                </Link>
            </div>
            <div className='flex justify-center font-[Mona-Sans,Helvetica-Neue,Helvetica,Arial,sans-serif]'>
                <div className='block'>
                    <div className='p-6 flex justify-center'>
                        <h1 className='font-[700] text-4xl text-[#0D0C22]'>What brings you to Dribbble?</h1>
                    </div>
                    <div className='pb-6 px-6 flex justify-center'>
                        <h1 className=' text-[#616167]'>Select the options that best describe you. Don't worry, you can explore other options later.</h1>
                    </div>
                    <div className='flex flex-wrap justify-center p-10'>
                        <CardOption
                            cardNumber={1}
                            selectedCards={selectedCards}
                            handleCardClick={handleCardClick}
                            title="I'm a designer looking to share my work"
                        />
                        <CardOption
                            cardNumber={2}
                            selectedCards={selectedCards}
                            handleCardClick={handleCardClick}
                            title="I'm looking to hire a designer"
                        />
                        <CardOption
                            cardNumber={3}
                            selectedCards={selectedCards}
                            handleCardClick={handleCardClick}
                            title="I'm looking for design inspiration"
                        />
                    </div>
                    <div className=' pb-4 px-4 flex justify-center'>
                        <div className='block text-center'>
                            {selectedCards.length > 0 && (<h1 className='font-[700] font-[Helvetica-Neue,Helvetica,Arial,sans-serif] sm:text-base md:text-lg lg:text-lg text-lg text-[#0D0C22] avatar'>Anything else? You can select multiple</h1>)}
                            <div className='flex justify-center'>
                                <button
                                    type="submit"
                                    className={`bg-[#EA4C89] rounded-xl text-white md:w-auto px-24 py-2  w-full duration-300 mt-6 ${selectedCards.length > 0 ? 'hover:scale-105' : 'opacity-50 cursor-not-allowed'}`}
                                    disabled={selectedCards.length === 0}
                                    onClick={handleFinish}
                                >
                                    Finish
                                </button>
                            </div>
                            <Link to="/addPhoto">
                                <div className='flex justify-center'>
                                    {selectedCards.length > 0 && (
                                        <h1 className='font-[700] text-sm text-[#939393] hover:text-[#EA4C89] avatar mt-2'>or Press Return</h1>
                                    )}
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddRole;
