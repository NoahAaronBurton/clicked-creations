export default function NavItem({ name, icon: Icon, onClick }) {

      return (
        <button onClick={onClick}>
            <Icon color='black' size='48px' />
        </ button>    
      );
}