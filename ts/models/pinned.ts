/**
 * Pinned Interface
 *  Provides the data type for saving pinned data
 */
interface Pinned {
    Name: string;
    Home: boolean;
    Location: string;
}

interface WeatherPinned extends Pinned {
    Data: any;
}