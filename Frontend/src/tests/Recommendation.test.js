import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Recommendations from '../components/Recommendations'; // Bileşenin doğru yolu
import { getRecommendations } from '../service/apiService';

jest.mock('../service/apiService'); // API fonksiyonunu mock'liyoruz

describe('Recommendations Component', () => {
  test('renders recommendations when data is fetched successfully', async () => {
    getRecommendations.mockResolvedValue([
      { movie_title: 'Movie 1', director_names: 'Director 1', movie_genres: 'Action' },
      { movie_title: 'Movie 2', director_names: 'Director 2', movie_genres: 'Drama' },
    ]);

    render(<Recommendations />);

    await waitFor(() => screen.getByRole('button', { name: /İleri/i }));
    userEvent.click(screen.getByRole('button', { name: /İleri/i }));

    await waitFor(() => {
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Movie 2')).toBeInTheDocument();
    });
  });

  test('displays error message when API call fails', async () => {
    getRecommendations.mockRejectedValue(new Error('API call failed'));

    render(<Recommendations />);

    await waitFor(() => screen.getByRole('button', { name: /İleri/i }));
    userEvent.click(screen.getByRole('button', { name: /İleri/i }));

    await waitFor(() => {
      expect(screen.getByText('Bir hata oluştu')).toBeInTheDocument();
    });
  });
});
