import {
    useContext,
    useEffect,
    useState,
} from "react";

import {
    Button,
    Container,
    Form,
    Navbar,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import ghostsData from "../data/Ghosts.json";
import GhostCard from "../components/GhostCard";
import Saved from "../components/Saved";
import AuthContext from "../contexts/AuthContext";

function Dashboard() {
    // This stores all ghosts from Ghosts.json
    const [ghosts, setGhosts] =
        useState(ghostsData);

    // Instead of starting with an empty array every time, we first check if there is already a saved booking list inside Local Storage.
    const [
        bookingList,
        setBookingList,
    ] = useState(() => {

        // Get saved booking data from Local Storage
        const savedBookingList =
            localStorage.getItem(
                "hantupedia-saved"
            );

        // If something was saved before, convert the JSON text back into an array, otherwise start with an empty array.
        return savedBookingList
            ? JSON.parse(savedBookingList)
            : [];
    });

    // useEffect runs whenever bookingList changes, will automatically update Local Storage.
    useEffect(() => {
        localStorage.setItem(
            "hantupedia-saved",
            JSON.stringify(bookingList)
        );
    }, [bookingList]);

    // These control which ghost categories are visible on the dashboard.
    const [
        showMalay,
        setShowMalay,
    ] = useState(true);

    const [
        showChinese,
        setShowChinese,
    ] = useState(true);

    const [
        showIndian,
        setShowIndian,
    ] = useState(true);


    // Get the logout function from AuthContext.
    const { logout } =
        useContext(AuthContext);

    const navigate =
        useNavigate();

    // CHANGE AVAILABLE / BUSY
    const toggleStatus = (id) => {

        // Find the ghost that was clicked
        const selectedGhost =
            ghosts.find(
                (ghost) =>
                    ghost.id === id
            );

        // Create a new ghost array and toggle the selected ghost's status
        const updatedGhosts =
            ghosts.map((ghost) => {
                if (
                    ghost.id === id
                ) {
                    return {
                        ...ghost,
                        status:
                            ghost.status ===
                                "Available"
                                ? "Busy"
                                : "Available",
                    };
                }
                return ghost;
            });

        // Update ghost state
        setGhosts(
            updatedGhosts
        );

        // If a ghost was Available and is now changed to Busy, remove it from the booking list automatically.
        if (
            selectedGhost &&
            selectedGhost.status ===
            "Available"
        ) {
            setBookingList(
                bookingList.filter(
                    (ghost) =>
                        ghost.id !== id
                )
            );
        }
    };

    // ADD TO BOOKING
    const addToBooking = (
        ghost
    ) => {
        // Check if this ghost is already inside the booking list
        const alreadyBooked =
            bookingList.some(
                (item) =>
                    item.id === ghost.id
            );
        // Only add if it is not already there
        if (!alreadyBooked) {
            setBookingList([
                ...bookingList,
                ghost,
            ]);
        }
    };

    // REMOVE ONE GHOST
    const removeFromBooking = (
        id
    ) => {
        // Keep every ghost except the one with the matching ID
        setBookingList(
            bookingList.filter(
                (ghost) =>
                    ghost.id !== id
            )
        );
    };

    //CLEAR BOOKING
    const clearBooking = () => {
        // Empty the whole booking list
        setBookingList([]);
    };

    //FILTER GHOSTS
    const filteredGhosts =
        ghosts.filter(
            (ghost) =>
                (
                    ghost.category ===
                    "Malay" &&
                    showMalay
                ) ||
                (
                    ghost.category ===
                    "Chinese" &&
                    showChinese
                ) ||
                (
                    ghost.category ===
                    "Indian" &&
                    showIndian
                )
        );
    // Logout changes isLoggedIn to false, then sends the user back to /login.
    const handleLogout = () => {
        logout();
        navigate(
            "/login"
        );
    };

    return (
        <>
            {/*NAVBAR*/}
            <Navbar className="ghost-navbar">
                <Container fluid>
                    <Navbar.Brand className="ghost-brand">
                        👻 HANTUPEDIA
                    </Navbar.Brand>
                    <div className="navbar-actions">
                        {/* Shows how many ghosts are currently in the cart.
                        */}
                        <div className="navbar-booking-count">
                            🛒{" "}
                            {bookingList.length}
                        </div>
                        <Button
                            className="logout-button"
                            onClick={
                                handleLogout
                            }
                        >
                            Logout
                        </Button>
                    </div>
                </Container>
            </Navbar>


            {/*MAIN DASHBOARD*/}
            <Container
                fluid
                className="dashboard"
            >
                {/*DASHBOARD HEADER*/}
                <div className="dashboard-heading">
                    <div>
                        <p className="dashboard-small-title">
                            SUPERNATURAL BOOKING SYSTEM
                        </p>
                        <h1>
                            Ghost Dashboard
                        </h1>
                        <p>
                            Browse and book
                            supernatural talent
                            from Malaysia's
                            multicultural ghost
                            community.
                        </p>
                    </div>

                    {/* Shows how many ghosts remain after filtering.*/}
                    <div className="ghost-counter">
                        <strong>
                            {
                                filteredGhosts.length
                            }
                        </strong>
                        <span>
                            Ghosts Showing
                        </span>
                    </div>
                </div>


                <div className="dashboard-layout">
                    {/*FILTERS*/}
                    <aside className="ghost-filters">
                        <h2>
                            🔮 Ghost Types
                        </h2>
                        <p>
                            Select which ghost
                            categories you want
                            to browse.
                        </p>

                        {/*Malay checkbox*/}
                        <Form.Check
                            type="checkbox"
                            id="malay-filter"
                            label="Malay Ghosts"
                            checked={showMalay}
                            onChange={(
                                event
                            ) =>
                                setShowMalay(
                                    event.target
                                        .checked
                                )
                            }
                        />

                        {/*Chinese checkbox*/}
                        <Form.Check
                            type="checkbox"
                            id="chinese-filter"
                            label="Chinese Ghosts"
                            checked={
                                showChinese
                            }
                            onChange={(
                                event
                            ) =>
                                setShowChinese(
                                    event.target
                                        .checked
                                )
                            }
                        />

                        {/*Indian checkbox*/}
                        <Form.Check
                            type="checkbox"
                            id="indian-filter"
                            label="Indian Ghosts"
                            checked={showIndian}
                            onChange={(
                                event
                            ) =>
                                setShowIndian(
                                    event.target
                                        .checked
                                )
                            }
                        />

                        <div className="filter-note">
                            <strong>
                                👁 Booking Rules
                            </strong>
                            <p>
                                Only ghosts marked
                                available can be
                                booked.
                            </p>
                        </div>
                    </aside>


                    {/*GHOST LIST*/}
                    <main className="ghost-results">
                        <div className="result-heading">
                            <div>
                                <p className="result-small">
                                    SUPERNATURAL TALENT
                                </p>
                                <h2>
                                    Registered
                                    Apparitions
                                </h2>
                            </div>
                            <span>
                                Showing{" "}
                                {
                                    filteredGhosts.length
                                }{" "}
                                of{" "}
                                {ghosts.length}
                            </span>
                        </div>

                        {/* GUIDE: If no category is selected, show an empty message. */}
                        {
                            filteredGhosts.length ===
                                0 ? (
                                <div className="no-ghosts">
                                    <h2>
                                        👻 Nobody here.
                                    </h2>
                                    <p>
                                        Tick at least one
                                        ghost category.
                                    </p>
                                </div>
                            ) : (
                                // Loop through every filtered ghost and create a GhostCard
                                <div className="ghost-grid">
                                    {
                                        filteredGhosts.map(
                                            (ghost) => (
                                                <GhostCard
                                                    key={
                                                        ghost.id
                                                    }
                                                    ghost={
                                                        ghost
                                                    }
                                                    onToggleStatus={
                                                        toggleStatus
                                                    }
                                                    onBook={
                                                        addToBooking
                                                    }
                                                    bookingList={
                                                        bookingList
                                                    }
                                                />
                                            )
                                        )
                                    }
                                </div>
                            )
                        }
                    </main>

                    {/*SAVED / BOOKING CART*/}
                    <Saved
                        bookingList={
                            bookingList
                        }
                        onRemove={
                            removeFromBooking
                        }
                        onClear={
                            clearBooking
                        }
                    />
                </div>
            </Container>
        </>
    );
}

export default Dashboard;