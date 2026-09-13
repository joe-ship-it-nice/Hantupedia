import {
    Badge,
    Button,
    Card,
} from "react-bootstrap";

function GhostCard({
    ghost,
    onToggleStatus,
    onBook,
    bookingList,
}) {
    const isAvailable =
        ghost.status === "Available";

    const isBooked =
        bookingList.some(
            (item) => item.id === ghost.id
        );

    return (
        <Card className="ghost-card">
            <div className="ghost-card-image-wrapper">
                <Card.Img
                    variant="top"
                    src={ghost.image}
                    alt={ghost.name}
                    className="ghost-card-image"
                />
                <Badge
                    className={
                        isAvailable
                            ? "status-badge status-available"
                            : "status-badge status-busy"
                    }
                >
                    {ghost.status}
                </Badge>
            </div>

            <Card.Body>
                <div className="ghost-category">
                    {ghost.category}
                </div>
                <Card.Title className="ghost-name">
                    {ghost.name}
                </Card.Title>
                <Card.Subtitle
                    className="ghost-origin"
                    style={{ marginBottom: "18px" }}
                >
                    {ghost.origin}
                </Card.Subtitle>
                <Card.Text className="ghost-description">
                    {ghost.description}
                </Card.Text>

                <div className="ghost-status-row">
                    <span>
                        Status:{" "}
                        <strong>
                            {ghost.status}
                        </strong>
                    </span>
                    <Button
                        className="status-toggle-button"
                        onClick={() =>
                            onToggleStatus(ghost.id)
                        }
                    >
                        Change Status
                    </Button>
                </div>

                <Button
                    className={
                        isBooked
                            ? "booking-button booked-button"
                            : "booking-button"
                    }
                    disabled={
                        !isAvailable ||
                        isBooked
                    }
                    onClick={() =>
                        onBook(ghost)
                    }
                >
                    {!isAvailable
                        ? "👻 Currently Busy"
                        : isBooked
                            ? "✓ Saved"
                            : "🛒 Add to Booking"}
                </Button>
            </Card.Body>
        </Card>
    );
}

export default GhostCard;