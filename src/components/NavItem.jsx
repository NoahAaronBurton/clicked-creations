export default function NavItem({ name, icon: Icon, onClick }) {
  return (
    <button className="rounded-lg transition duration-500 ease-in-out hover:bg-white hover:bg-opacity-50" onClick={onClick}>
      <Icon color='#14EF85' size='48px' />
    </button>    
  );
}