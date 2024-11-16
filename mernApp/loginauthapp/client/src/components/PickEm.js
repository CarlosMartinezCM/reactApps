import React, { useState, useEffect } from 'react';
import Styles from "../components/style.css";

function PickEm() {
    // State to track selected options and game data
    const [user, setUser] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [games, setGames] = useState([]);

    useEffect(() => {
        // Simulating fetching game data (you can modify this to fetch from an API)
        const numGames = 16;
        const gameOptions = [];
        for (let i = 1; i <= numGames; i += 2) {
            gameOptions.push({ id: i, option1: i, option2: i + 1 });
        }
        setGames(gameOptions);
    }, []);

    const handleSelectionChange = (gameId, option) => {
        setSelectedOptions(prevState => {
            const updatedSelections = [...prevState];
            const existingSelectionIndex = updatedSelections.findIndex(selection => selection.gameId === gameId);

            if (existingSelectionIndex === -1) {
                // If the game doesn't have a selection yet, add a new one
                updatedSelections.push({ gameId, selectedOption: option });
            } else {
                // If the game has a selection, update it
                updatedSelections[existingSelectionIndex].selectedOption = option;
            }

            return updatedSelections;
        });
    };

    //alert use for testing
    const handleSubmit = (event) => {
        event.preventDefault();  // Prevent form submission

        // Collect the selected radio buttons
        const selected = document.querySelectorAll('input[type="radio"]:checked');
        const selection = Array.from(selected).map(input => input.value);

        // Display selected picks in an alert box
        alert("Selected picks: " + selection.join(', '));

        // Update the state (if needed)
        setSelectedOptions(selection);
    };

    /* const handleSubmit = async (event) => {
      event.preventDefault();
  
      // Send the selected options to the backend (MongoDB)
      try {
        const response = await fetch('/api/submitPicks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ selections: selectedOptions }),
        });
  
        if (response.ok) {
          alert('Your picks have been submitted!');
        } else {
          alert('Failed to submit picks.');
        }
      } catch (error) {
        console.error('Error submitting picks:', error);
        alert('Error submitting picks.');
      }
    }; */

    return (
        <div className="body">
            <div className="jumbotron">
                <div className="home">
                    <header className="hero">
                        <h1>PickEm</h1>
                        <p>Your one-stop solution for all your picks!</p>
                        <button className="cta-button">Get Started</button>
                    </header>
                    <main>
                        <section className="features">
                            <h2>Game Picks</h2>
                            <form onSubmit={handleSubmit}>
                                {games.map((game) => (
                                    <div key={game.id} style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
                                        <label>
                                            <input
                                                type="radio"
                                                name={`game-${game.id}`}
                                                value={game.option1}
                                                checked={selectedOptions.some(
                                                    (selection) => selection.gameId === game.id && selection.selectedOption === game.option1
                                                )}
                                                onChange={() => handleSelectionChange(game.id, game.option1)}
                                            />
                                            Option {game.option1}
                                        </label>
                                        <label style={{ marginLeft: '10px' }}>
                                            <input
                                                type="radio"
                                                name={`game-${game.id}`}
                                                value={game.option2}
                                                checked={selectedOptions.some(
                                                    (selection) => selection.gameId === game.id && selection.selectedOption === game.option2
                                                )}
                                                onChange={() => handleSelectionChange(game.id, game.option2)}
                                            />
                                            Option {game.option2}
                                        </label>
                                    </div>
                                ))}
                                <button type="submit">Submit Picks</button>
                            </form>
                        </section>
                    </main>
                    <footer className="footer">
                        <p>&copy; The footer</p>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default PickEm;
