import usersServices from '../../../modules/users/services';

export default function (req, res, next) {
  return usersServices
    .findOne(req.params.userEmail)
    .then(response => res.send(response))
    .catch(err => next(err));
}
