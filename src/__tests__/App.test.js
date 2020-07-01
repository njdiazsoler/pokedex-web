import React from 'react';
import App from '../App';
import '@testing-library/jest-dom';
import { render, screen, waitForDomChange } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from 'pokeapi-js-wrapper';

// test('handles component mounting', () => {
//   server.use(
//     rest.post('/login', (req, res, ctx) => {
//       // Respond with "500 Internal Server Error" status for this test.
//       return res(
//         ctx.status(500),
//         ctx.json({ message: 'Internal Server Error' }),
//       )
//     }),
//   )

//   render(<Login />)
//   userEvent.type(
//     screen.getByRole('textbox', { name: /username/i }),
//     'john.maverick',
//   )
//   userEvent.type(
//     screen.getByRole('textbox', { name: /password/i }),
//     'super-secret',
//   )
//   userEvent.click(screen.getByText(/submit/i))

//   // Assert meaningful error message shown to the user
//   expect(alert).toHaveTextContent(/sorry, something went wrong/i)
//   expect(window.sessionStorage.getItem('token')).toBeNull()
// })

// // Enable API mocking before tests.
// beforeAll(() => server.listen())

// // Reset any runtime request handlers we may add during the tests.
// afterEach(() => server.resetHandlers())

// // Disable API mocking after the tests are done.
// afterAll(() => server.close())

test('renders alert page', async () => {
  const { getByText } = render(<App limit={5} />);
  const titleElement = getByText(/Pokémon Finder/i);
  try {
    await waitForDomChange(() => expect(titleElement).toBeInTheDocument());
  } catch (err) {
    console.error(err);
  }
});
