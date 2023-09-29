def calculate_air_density(altitude_meters, temperature_celsius):
    gas_constant = 287.05 
    sea_level_temperature = 288.15
    air_density = (sea_level_temperature / (temperature_celsius + 273.15)) * \
                  (101325 / (gas_constant * (temperature_celsius + 273.15))) * \
                  (1 - (0.0065 * altitude_meters) / (temperature_celsius + 273.15)) ** 5.257
    return air_density

def estimate_average_wattage(duration_seconds, distance_meters, average_grade, rider_weight_kg=70, altitude_meters=0, temperature_celsius=20):
    air_density = calculate_air_density(altitude_meters, temperature_celsius)
    gravitational_acceleration = 9.81 
    rolling_resistance_coefficient = 0.0000375
    gravity_force = rider_weight_kg * gravitational_acceleration * average_grade / 100.0
    rolling_resistance_force = rider_weight_kg * gravitational_acceleration * rolling_resistance_coefficient
    air_resistance_force = 0.1825 * air_density * (distance_meters / duration_seconds) ** 2
    total_resistance_force = gravity_force + rolling_resistance_force + air_resistance_force
    work_done_joules = total_resistance_force * distance_meters
    average_power_watts = work_done_joules / duration_seconds
    return average_power_watts
