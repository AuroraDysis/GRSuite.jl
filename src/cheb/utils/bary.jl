"""
    bary(w::AbstractVector{TR}, x::AbstractVector{TR}, f::AbstractVector{TR}, x0::TR) where {
        TR<:AbstractFloat
    }

Evaluate a polynomial interpolant using the barycentric interpolation formula.

# Arguments
- `w`: Vector of barycentric weights
- `x`: Vector of interpolation points (typically Chebyshev points)
- `f`: Vector of function values at interpolation points
- `x0`: Point at which to evaluate the interpolant

# Reference
- [chebfun/@chebtech2/bary.m at master · chebfun/chebfun](https://github.com/chebfun/chebfun/blob/master/%40chebtech2/bary.m)
"""
function bary(
    w::AbstractVector{TR}, x::AbstractVector{TR}, f::AbstractVector{TR}, x0::TR
) where {
    TR<:AbstractFloat,
}
    p = zero(TR)
    q = zero(TR)

    @inbounds for i in eachindex(x)
        if x0 == x[i]
            return f[i]
        end

        wi = w[i] / (x0 - x[i])
        p += wi * f[i]
        q += wi
    end

    return p / q
end

export bary
