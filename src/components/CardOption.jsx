import React from 'react';

const CardOption = ({ cardNumber, selectedCards, handleCardClick, title }) => {
    const isSelected = selectedCards.includes(cardNumber);
    const borderClass = isSelected ? 'border-[#EA4C89] border-[3px]' : 'border-[#E0E0E0]';

    // Define different translation percentages for different screen sizes
    const translation = {
        sm: isSelected ? '-translate-y-[20%]' : '',
        md: isSelected ? '-translate-y-[35%]' : '',
        lg: isSelected ? '-translate-y-[40%]' : '',
        xl: isSelected ? '-translate-y-[50%]' : '',
    };

    return (
        <div className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 sm:p-6 flex flex-col items-center border rounded-xl relative ${borderClass} mx-6 my-6`}>
            <div className={`w-full transition-transform duration-500 transform ${translation.sm} sm:${translation.md} md:${translation.lg} lg:${translation.xl}`} style={{ position: 'relative' }}>
                <img
                    src='/design1.png'
                    alt='logo'
                    className='w-full'
                />
                <div className='block text-center mt-4'>
                    <h1 className='font-bold text-lg text-[#0D0C22] sm:text-base md:text-lg lg:text-lg'>{title}</h1>
                    {isSelected && (
                        <p className='text-gray-600 text-xs sm:text-xs md:text-xs lg:text-sm' >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Suspendisse nec arcu ligula. Nulla facilisi. Integer nec
                            nulla eget arcu eleifend interdum.
                        </p>
                    )}
                </div>
            </div>
            <input
                name={`terms${cardNumber}`}
                id={`terms${cardNumber}`}
                type='checkbox'
                className='w-6 h-6 mt-2 rounded-full border-[1px] border-[#E0E0E0]'
                onChange={() => handleCardClick(cardNumber)}
                checked={selectedCards.includes(cardNumber)}
            />
        </div>
    );
};

export default CardOption;
