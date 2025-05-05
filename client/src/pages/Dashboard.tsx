import { useEffect } from "react";

export default function Dashboard() {
  // Setup counter animations and table toggling
  useEffect(() => {
    // Enhanced animated counters with easing effect
    const counters = document.querySelectorAll(".count");
    
    // Delay the start of counting to allow for the entrance animations
    setTimeout(() => {
      counters.forEach((counter, index) => {
        if (counter instanceof HTMLElement) {
          counter.innerText = "0";
          
          const parent = counter.parentElement;
          if (!parent) return;
          
          const target = +(parent.getAttribute("data-target") || "0");
          
          // Create a more dynamic timing based on the target value
          const duration = 2000 + (index * 200); // Staggered animation starts
          const startTime = performance.now();
          
          const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4); // Ease out quartic
          
          const updateCounter = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            
            const currentValue = Math.floor(easedProgress * target);
            counter.innerText = currentValue.toString();
            
            // Add a class when the counter is actively changing
            if (progress < 1) {
              counter.classList.add("counting");
              requestAnimationFrame(updateCounter);
            } else {
              counter.innerText = target.toString();
              counter.classList.remove("counting");
              counter.classList.add("complete");
              
              // Add a pulse effect when counting completes
              setTimeout(() => {
                counter.classList.add("pulse-complete");
                setTimeout(() => counter.classList.remove("pulse-complete"), 500);
              }, 100);
            }
          };
          
          requestAnimationFrame(updateCounter);
        }
      });
    }, 800); // Delay to allow for card entrance animations

    // Card click highlight for counter
    const cards = document.querySelectorAll(".card");
    const tables = document.querySelectorAll(".data-table");

    cards.forEach(card => {
      card.addEventListener("click", () => {
        cards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");

        tables.forEach(table => table.classList.remove("active"));
        const targetTableId = card.getAttribute("data-table");
        if (targetTableId) {
          const targetTable = document.getElementById(targetTableId);
          if (targetTable) targetTable.classList.add("active");
        }
      });
    });

    // Make the first card active by default
    const firstCard = document.querySelector(".card");
    if (firstCard) {
      firstCard.classList.add("active");
      const targetTableId = firstCard.getAttribute("data-table");
      if (targetTableId) {
        const targetTable = document.getElementById(targetTableId);
        if (targetTable) targetTable.classList.add("active");
      }
    }

    return () => {
      // Clean up event listeners if component unmounts
      cards.forEach(card => {
        card.removeEventListener("click", () => {});
      });
    };
  }, []);

  return (
    <div className="dashboard-container">
      {/* Topbar */}
      <div className="topbar">
        <img src="/img/vintage-logo.png" alt="Vintage Group Logo" className="logo" />
        <h1>Vintage Group</h1>
      </div>

      <h1 className="welcome-heading">Welcome to Vintage Group Real Estate Dashboard Portal</h1>

      {/* Realtime Counter */}
      <div className="section" id="counter">
        <h2>Realtime Counters</h2>
        <div className="counters">
          <div
            className="card downloads"
            data-target="1000"
            data-table="downloads-table"
          >
            App Downloads<br /><span className="count">0</span>
          </div>
          <div className="card leads" data-target="100" data-table="leads-table">
            Number of Leads<br /><span className="count">0</span>
          </div>
          <div className="card suspects" data-target="5" data-table="suspects-table">
            Number of Suspects<br /><span className="count">0</span>
          </div>
          <div
            className="card prosuspects"
            data-target="0"
            data-table="prosuspects-table"
          >
            Number of Prospects<br /><span className="count">0</span>
          </div>
        </div>

        <div className="data-table" id="downloads-table">
          <h3>App Downloads</h3>
          <table>
            <thead>
              <tr>
                <th>Day and Date</th>
                <th>No. of Downloads</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Monday (21-04-2025)</td>
                <td>200</td>
              </tr>
              <tr>
                <td>Tuesday (22-04-2025)</td>
                <td>180</td>
              </tr>
              <tr>
                <td>Wednesday (23-04-2025)</td>
                <td>220</td>
              </tr>
              <tr>
                <td>Thursday (24-04-2025)</td>
                <td>150</td>
              </tr>
              <tr>
                <td>Friday (25-04-2025)</td>
                <td>250</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="data-table" id="leads-table">
          <h3>Leads</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Sourced</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Customer 1</td>
                <td>9876543210</td>
                <td>customer1@example.com</td>
                <td>
                  <select>
                    <option value="bought">Bought</option>
                    <option value="portal">Portal</option>
                    <option value="app">App</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Customer 2</td>
                <td>9871234567</td>
                <td>customer2@example.com</td>
                <td>
                  <select>
                    <option value="portal">Portal</option>
                    <option value="bought">Bought</option>
                    <option value="app">App</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Customer 3</td>
                <td>9871234267</td>
                <td>customer3@example.com</td>
                <td>
                  <select>
                    <option value="app">App</option>
                    <option value="portal">Portal</option>
                    <option value="bought">Bought</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="data-table" id="suspects-table">
          <h3>Suspect Customer Preferences</h3>
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Top 3 Locations</th>
                <th>Price Range</th>
                <th>Type of Apartment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Customer A</td>
                <td>OMR, Thalambur, Perumbakkam</td>
                <td>75L – 1.1Cr</td>
                <td>3BHK Lake View Villas</td>
              </tr>
              <tr>
                <td>Customer B</td>
                <td>Navalur, Sholinganallur, Thoraipakkam</td>
                <td>55L – 85L</td>
                <td>Smart 2BHK Apartments</td>
              </tr>
              <tr>
                <td>Customer C</td>
                <td>Kelambakkam, Medavakkam, Pallikaranai</td>
                <td>28L – 45L</td>
                <td>Compact Budget Flats</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="data-table" id="prosuspects-table">
          <h3>Prospects</h3>
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Customization</th>
                <th>Emotion</th>
                <th>Call Log Attachment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Customer 1</td>
                <td>Balcony, Garden Area</td>
                <td>Excited</td>
                <td><a href="#" target="_blank">Call on Apr 15 - Discussed villa</a></td>
              </tr>
              <tr>
                <td>Customer 2</td>
                <td>Gated Community, Parking Space</td>
                <td>Interested</td>
                <td><a href="#" target="_blank">Call on Apr 16 - Interested in villa</a></td>
              </tr>
              <tr>
                <td>Customer 3</td>
                <td>Kids Play Area, Nearby Schools</td>
                <td>Highly Aligned</td>
                <td><a href="#" target="_blank">Call on Apr 17 - Asked about loan</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}