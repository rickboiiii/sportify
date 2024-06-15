import jwt from 'jsonwebtoken';
import { Korisnik, Uloga } from '../models';

const secret = 'your_jwt_secret';

async function getUserRoleFromToken(token) {
  try {
    const decodedToken = jwt.decode(token);
    if (!decodedToken) {
      throw new Error('Nevažeći token');
    }

    const username = decodedToken.username;

    const user = await Korisnik.findOne({
      where: { korisnicko_ime },
      include: {
        model: Role,
        attributes: ['korisnicko_ime']
      }
    });

    if (!user) {
      throw new Error('Korisnik nije pronađen');
    }

    return user.Uloga.naziv_uloge;
  } catch (err) {
    console.error('Greška prilikom dohvaćanja uloge korisnika:', err);
    return 'guest';
  }
}

export default getUserRoleFromToken;
