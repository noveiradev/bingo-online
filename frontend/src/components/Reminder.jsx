import PropTypes from 'prop-types';

export default function Reminder({children}) {
  return (
    <>
      <article className="bg-reminder/37 w-[300px] text-white/95 text-center p-2 rounded-lg shadow-md mt-4 text-[0.8rem] font-poppins">
        {children}
      </article>
    </>
  )
}

Reminder.propTypes = {
  text: PropTypes.string.isRequired,
};
