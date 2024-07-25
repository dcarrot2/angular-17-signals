package main

import (
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"time"
)

type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

var users []User

func init() {
	rand.Seed(time.Now().UnixNano())
	users = generateMockUsers(15)
}

func generateMockUsers(count int) []User {
	mockUsers := make([]User, count)
	for i := 0; i < count; i++ {
		mockUsers[i] = User{
			ID:    i + 1,
			Name:  generateRandomName(),
			Email: generateRandomEmail(),
		}
	}
	return mockUsers
}

func generateRandomName() string {
	firstNames := []string{"John", "Jane", "Alice", "Bob", "Charlie", "Diana", "Ethan", "Fiona", "George", "Hannah"}
	lastNames := []string{"Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"}
	return firstNames[rand.Intn(len(firstNames))] + " " + lastNames[rand.Intn(len(lastNames))]
}

func generateRandomEmail() string {
	domains := []string{"gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "example.com"}
	name := generateRandomName()
	return name[0:1] + name[len(name)/2:len(name)/2+1] + name[len(name)-1:] +
		strconv.Itoa(rand.Intn(100)) + "@" + domains[rand.Intn(len(domains))]
}

func usersHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*") // For CORS, remove in production

	// Simulate some delay
	time.Sleep(time.Millisecond * time.Duration(rand.Intn(1000)))

	// Randomly cause an error about 10% of the time
	if rand.Float32() < 0.1 {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(users)
}

func enableCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*") // Allow any origin
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Check if it's a preflight request
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Call the next handler
		next(w, r)
	}
}

func main() {
	http.HandleFunc("/users", enableCORS(usersHandler))
	log.Println("Server starting on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
