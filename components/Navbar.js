import { Fragment, useState, useContext, useEffect } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { MenuIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link';
import { Store } from './../utils/store/Store';
import { signOut, useSession } from 'next-auth/react';
import Cookies from 'js-cookie';

const navigation = {
    categories: [
        {
            id: 'women',
            name: 'Women',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Basic Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
            ],
            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { name: 'Tops', href: '#' },
                        { name: 'Dresses', href: '#' },
                        { name: 'Pants', href: '#' },
                        { name: 'Denim', href: '#' },
                        { name: 'Sweaters', href: '#' },
                        { name: 'T-Shirts', href: '#' },
                        { name: 'Jackets', href: '#' },
                        { name: 'Activewear', href: '#' },
                        { name: 'Browse All', href: '#' },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watches', href: '#' },
                        { name: 'Wallets', href: '#' },
                        { name: 'Bags', href: '#' },
                        { name: 'Sunglasses', href: '#' },
                        { name: 'Hats', href: '#' },
                        { name: 'Belts', href: '#' },
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Full Nelson', href: '#' },
                        { name: 'My Way', href: '#' },
                        { name: 'Re-Arranged', href: '#' },
                        { name: 'Counterfeit', href: '#' },
                        { name: 'Significant Other', href: '#' },
                    ],
                },
            ],
        },
        {
            id: 'men',
            name: 'Men',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
                    imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
                },
                {
                    name: 'Artwork Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
                    imageAlt:
                        'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
                },
            ],
            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { name: 'Tops', href: '#' },
                        { name: 'Pants', href: '#' },
                        { name: 'Sweaters', href: '#' },
                        { name: 'T-Shirts', href: '#' },
                        { name: 'Jackets', href: '#' },
                        { name: 'Activewear', href: '#' },
                        { name: 'Browse All', href: '#' },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watches', href: '#' },
                        { name: 'Wallets', href: '#' },
                        { name: 'Bags', href: '#' },
                        { name: 'Sunglasses', href: '#' },
                        { name: 'Hats', href: '#' },
                        { name: 'Belts', href: '#' },
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Re-Arranged', href: '#' },
                        { name: 'Counterfeit', href: '#' },
                        { name: 'Full Nelson', href: '#' },
                        { name: 'My Way', href: '#' },
                    ],
                },
            ],
        },
    ],
    pages: [
        { name: 'Company', href: '#' },
        { name: 'Stores', href: '#' },
    ],
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const { state, dispatch } = useContext(Store);
    const { status, data: session } = useSession();
    const { cart } = state;
    const [open, setOpen] = useState(false)
    const [userMenu, setUserMenu] = useState(false);
    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    }, [cart.cartItems]);

    const logoutClickHandler = () => {
        Cookies.remove('cart');
        dispatch({ type: 'CART_RESET' })
        signOut({ callbackUrl: '/login' });
    }

    return (
        <div className="sticky top-0 w-full bg-white z-50 border-b border-gray-400">
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex z-40">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                                <div className="px-4 pt-5 pb-2 flex">
                                    <button
                                        type="button"
                                        className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Links */}
                                <Tab.Group as="div" className="mt-2">
                                    <div className="border-b border-gray-200">
                                        <Tab.List className="-mb-px flex px-4 space-x-8">
                                            {navigation.categories.map((category) => (
                                                <Tab
                                                    key={category.name}
                                                    className={({ selected }) =>
                                                        classNames(
                                                            selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent',
                                                            'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                                                        )
                                                    }
                                                >
                                                    {category.name}
                                                </Tab>
                                            ))}
                                        </Tab.List>
                                    </div>
                                    <Tab.Panels as={Fragment}>
                                        {navigation.categories.map((category) => (
                                            <Tab.Panel key={category.name} className="pt-10 pb-8 px-4 space-y-10">
                                                <div className="grid grid-cols-2 gap-x-4">
                                                    {category.featured.map((item) => (
                                                        <div key={item.name} className="group relative text-sm">
                                                            <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                                                <img src={item.imageSrc} alt={item.imageAlt} className="object-center object-cover" />
                                                            </div>
                                                            <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                                                <span className="absolute z-10 inset-0" aria-hidden="true" />
                                                                {item.name}
                                                            </a>
                                                            <p aria-hidden="true" className="mt-1">
                                                                Shop now
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                                {category.sections.map((section) => (
                                                    <div key={section.name}>
                                                        <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                                                            {section.name}
                                                        </p>
                                                        <ul
                                                            role="list"
                                                            aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                            className="mt-6 flex flex-col space-y-6"
                                                        >
                                                            {section.items.map((item) => (
                                                                <li key={item.name} className="flow-root">
                                                                    <a href={item.href} className="-m-2 p-2 block text-gray-500">
                                                                        {item.name}
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </Tab.Panel>
                                        ))}
                                    </Tab.Panels>
                                </Tab.Group>

                                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                                    {navigation.pages.map((page) => (
                                        <div key={page.name} className="flow-root">
                                            <a href={page.href} className="-m-2 p-2 block font-medium text-gray-900">
                                                {page.name}
                                            </a>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                                    <div className="flow-root">
                                        {status === 'loading' ? ('Loading') :
                                            (
                                                session?.user ? (session.user.name)
                                                    :
                                                    (
                                                        <div className="flow-root">
                                                            <Link href="/login">
                                                                <a className="-m-2 p-2 block font-medium text-gray-900">
                                                                    Giriş yap
                                                                </a>
                                                            </Link>
                                                            <Link href="/register">
                                                                <a href="#" className="-m-2 p-2 block font-medium text-gray-900">
                                                                    Hesap oluştur
                                                                </a>
                                                            </Link>
                                                        </div>
                                                    )
                                            )
                                        }
                                    </div>

                                </div>

                                <div className="border-t border-gray-200 py-6 px-4">
                                    <a href="#" className="-m-2 p-2 flex items-center">
                                        <img
                                            src="https://tailwindui.com/img/flags/flag-canada.svg"
                                            alt=""
                                            className="w-5 h-auto block flex-shrink-0"
                                        />
                                        <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                                        <span className="sr-only">, change currency</span>
                                    </a>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <header className="sticky top-0 bg-white z-50 ">
                <nav aria-label="Top" className="w-full sm:px-6 lg:px-8">
                    <div className="w-4/5 mx-auto">
                        <div className="h-16 flex items-center">
                            <button
                                type="button"
                                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                                onClick={() => setOpen(!open)}
                            >
                                <span className="sr-only">Open menu</span>
                                <MenuIcon className="h-6 w-6" aria-hidden="true" />
                            </button>

                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <Link href="/">
                                    <a>
                                        <span className="sr-only">Shopping</span>
                                        <img
                                            className="h-8 w-auto"
                                            src="/ShoppingLogo.png"
                                            alt=""
                                        />
                                    </a>
                                </Link>
                            </div>

                            {/* Flyout menus */}
                            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                                <div className="h-full flex space-x-8">
                                    {navigation.categories.map((category) => (
                                        <Popover key={category.name} className="flex">
                                            {({ open }) => (
                                                <>
                                                    <div className="relative flex">
                                                        <Popover.Button
                                                            className={classNames(
                                                                open
                                                                    ? 'border-indigo-600 text-indigo-600'
                                                                    : 'border-transparent text-gray-700 hover:text-gray-800',
                                                                'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                                                            )}
                                                        >
                                                            {category.name}
                                                        </Popover.Button>
                                                    </div>

                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-200"
                                                        enterFrom="opacity-0"
                                                        enterTo="opacity-100"
                                                        leave="transition ease-in duration-150"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500">
                                                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                            <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                                            <div className="relative bg-white">
                                                                <div className="max-w-7xl mx-auto px-8">
                                                                    <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                                                        <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                            {category.featured.map((item) => (
                                                                                <div key={item.name} className="group relative text-base sm:text-sm">
                                                                                    <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                                                                        <img
                                                                                            src={item.imageSrc}
                                                                                            alt={item.imageAlt}
                                                                                            className="object-center object-cover"
                                                                                        />
                                                                                    </div>
                                                                                    <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                                                                        <span className="absolute z-10 inset-0" aria-hidden="true" />
                                                                                        {item.name}
                                                                                    </a>
                                                                                    <p aria-hidden="true" className="mt-1">
                                                                                        Shop now
                                                                                    </p>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                        <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                                                            {category.sections.map((section) => (
                                                                                <div key={section.name}>
                                                                                    <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                                                                        {section.name}
                                                                                    </p>
                                                                                    <ul
                                                                                        role="list"
                                                                                        aria-labelledby={`${section.name}-heading`}
                                                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                    >
                                                                                        {section.items.map((item) => (
                                                                                            <li key={item.name} className="flex">
                                                                                                <a href={item.href} className="hover:text-gray-800">
                                                                                                    {item.name}
                                                                                                </a>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Popover.Panel>
                                                    </Transition>
                                                </>
                                            )}
                                        </Popover>
                                    ))}

                                    {navigation.pages.map((page) => (
                                        <a
                                            key={page.name}
                                            href={page.href}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                        >
                                            {page.name}
                                        </a>
                                    ))}
                                </div>
                            </Popover.Group>

                            <div className="ml-auto flex items-center">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    {status === 'loading' ? ('Loading') :
                                        session?.user ?
                                            (
                                                <div className="relative">
                                                    <div className="bg-white dark:bg-gray-800 flex items-center justify-between border rounded border-gray-300 dark:border-gray-700 w-40 cursor-pointer" onClick={() => setUserMenu(!userMenu)}>
                                                        <p className="pl-3 py-3 text-gray-600 dark:text-gray-4000 text-sm leading-3 tracking-normal font-normal">{session.user.name}</p>
                                                        <div className="cursor-pointer text-gray-600 dark:text-gray-400 mr-3">
                                                            {userMenu ? (
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-up" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                                    <polyline points="6 15 12 9 18 15" />
                                                                </svg>
                                                            ) : (
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-up" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                                    <polyline points="6 9 12 15 18 9" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {userMenu && (
                                                        <ul className="visible transition duration-300 opacity-100 bg-white dark:bg-gray-800 shadow rounded mt-2 pb-1 w-48 absolute">
                                                            <li className="cursor-pointer rounded-t text-sm flex flex-col font-bold leading-3 tracking-normal pt-4 pb-3 mb-1 bg-indigo-700 text-white px-3">
                                                                <span className="font-medium">
                                                                    {session.user.name}
                                                                </span>
                                                                <span className="font-normal mt-2">
                                                                    {session.user.email}
                                                                </span>
                                                            </li>
                                                            {session.user.isAdmin && (
                                                                <li>
                                                                    <Link href="/dashboard">
                                                                        <a className="flex cursor-pointer text-gray-600 dark:text-gray-400 text-sm dark:hover:bg-gray-600 dark:hover:text-white leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal">
                                                                            Panel
                                                                        </a>
                                                                    </Link>
                                                                </li>
                                                            )}
                                                            <li>
                                                                <Link href="/myOrders">
                                                                    <a className="flex cursor-pointer text-gray-600 dark:text-gray-400 text-sm dark:hover:bg-gray-600 dark:hover:text-white leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal">
                                                                        Siparişlerim
                                                                    </a>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/">
                                                                    <a className="flex cursor-pointer text-gray-600 dark:text-gray-400 text-sm dark:hover:bg-gray-600 dark:hover:text-white leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal">
                                                                        Ayarlar
                                                                    </a>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <hr className="border-gray-200 my-1" />
                                                            </li>
                                                            <li
                                                                onClick={logoutClickHandler}
                                                            >
                                                                <Link href="/">
                                                                    <a className="flex cursor-pointer text-gray-600 dark:text-gray-400 text-sm dark:hover:bg-gray-600 dark:hover:text-white leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal">
                                                                        Çıkış yap
                                                                    </a>
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    )}
                                                </div>
                                            )
                                            :
                                            (
                                                <>
                                                    <div className="flow-root">
                                                        <Link href="/login">
                                                            <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                                Giriş yap
                                                            </a>
                                                        </Link>
                                                    </div>
                                                    <span className="h-6 w-px bg-gray-400" aria-hidden="true" />
                                                    <div className="flow-root">

                                                        <Link href="/register">
                                                            <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                                Hesap oluştur
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </>
                                            )}

                                </div>

                                {/* Search */}
                                <div className="flex lg:ml-6">
                                    <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Search</span>
                                        <SearchIcon className="w-6 h-6" aria-hidden="true" />
                                    </a>
                                </div>

                                {/* Cart */}
                                <div className="ml-4 flow-root lg:ml-6">
                                    <Link href="/cart" >
                                        <a className="cursor-pointer group -m-2 p-2 flex items-center">
                                            <ShoppingBagIcon
                                                className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                                                {cartItemsCount}
                                            </span>
                                            <span className="sr-only">items in cart, view bag</span>

                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}
