import { TbSocial } from "react-icons/tb";

export default function NavItem(name, icon, onClick) {
    const iconStyle = {
        color: 'black',
        size: '48px'
    }

    
    return (
        <button className='mt-[92px]'>
            <TbSocial color='black' size={iconStyle} />
        </button>
    );
}