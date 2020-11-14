using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tgc_notes_be.Common
{
    public abstract class Payload
    {
        protected Payload(IReadOnlyList<UserError> errors = null)
        {
            Errors = errors;
        }

        public IReadOnlyList<UserError> Errors { get; }
    }
}
