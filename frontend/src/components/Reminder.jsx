import PropTypes from 'prop-types';

export default function Reminder({children}) {
  return (
    <>
      <article className="bg-reminder/37 w-[95%] max-w-[500px] text-white/95 text-center p-2 rounded-lg shadow-md mt-4 text-[0.8rem] font-poppins stable:text-[0.95rem] stable:w-[24rem]">
        {children}
      </article>
    </>
  )
}

Reminder.propTypes = {
  text: PropTypes.string.isRequired,
};
