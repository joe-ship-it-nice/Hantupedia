import { Button } from "react-bootstrap";

function Saved({
    bookingList,
    onRemove,
    onClear,
}) {
    const confirmBooking = () => {
        alert(
            `Booking confirmed for ${bookingList.length} ghost(s)! 👻 They will come find you immediately!`
        );
    };

    return (
        <aside className="booking-cart">
            <div className="booking-cart-title">
                <div>
                    <p className="booking-small">
                        YOUR SUMMONING LIST
                    </p>
                    <h2>
                        🛒 Saved
                    </h2>
                </div>
                <span className="booking-count">
                    {bookingList.length}
                </span>
            </div>

            {bookingList.length === 0 ? (
                <div className="booking-empty">
                    <div className="empty-ghost">
                        👻
                    </div>
                    <p>
                        Your booking list is empty.
                    </p>
                    <small>
                        Choose an available ghost to add it here.
                    </small>
                </div>
            ) : (
                <>
                    <div className="booking-items">
                        {bookingList.map(
                            (ghost) => (
                                <div
                                    key={ghost.id}
                                    className="booking-item"
                                >
                                    <img
                                        src={ghost.image}
                                        alt={ghost.name}
                                    />
                                    <div className="booking-item-info">
                                        <strong>
                                            {ghost.name}
                                        </strong>
                                        <span>
                                            {ghost.category}
                                        </span>
                                        <small>
                                            {ghost.talent}
                                        </small>
                                    </div>
                                    <button
                                        className="booking-remove"
                                        onClick={() =>
                                            onRemove(ghost.id)
                                        }
                                    >
                                        ×
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                    <div className="booking-summary">
                        <span>
                            Ghosts booked
                        </span>
                        <strong>
                            {bookingList.length}
                        </strong>
                    </div>
                    <Button
                        className="confirm-booking-button"
                        onClick={confirmBooking}
                    >
                        Confirm Booking
                    </Button>
                    <Button
                        className="clear-booking-button"
                        onClick={onClear}
                    >
                        Clear Booking
                    </Button>
                </>
            )}
        </aside>
    );
}

export default Saved;